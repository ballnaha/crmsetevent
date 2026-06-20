import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "EventSync <onboarding@resend.dev>";

type Recipient = { email: string; name?: string; company?: string };
type AttachmentInput = { filename: string; contentType: string; base64: string };

function merge(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`);
}

export async function GET(req: NextRequest) {
  const db = prisma;
  if (!db) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (idParam) {
      const campaign = await db.emailCampaign.findUnique({
        where: { id: parseInt(idParam, 10) },
        include: {
          recipients: {
            select: { status: true },
          },
        },
      });
      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }
      const sent = campaign.recipients.filter((r) => r.status === "SENT").length;
      const failed = campaign.recipients.filter((r) => r.status === "FAILED").length;
      return NextResponse.json({ status: campaign.status, sent, failed });
    }

    const campaigns = await db.emailCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        template: { select: { name: true } },
        _count: { select: { recipients: true } },
      },
    });
    return NextResponse.json({ campaigns });
  } catch (err) {
    console.error("[email-campaigns GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function runEmailCampaignQueue(campaignId: number, attachments: AttachmentInput[]) {
  const db = prisma;
  if (!db) {
    console.error("[Background Queue] Database client is unavailable");
    return;
  }

  try {
    const campaign = await db.emailCampaign.findUnique({
      where: { id: campaignId },
      include: { recipients: true },
    });
    if (!campaign) {
      console.error(`[Background Queue] Campaign ${campaignId} not found`);
      return;
    }

    let sentCount = 0;
    let failCount = 0;

    if (attachments.length === 0) {
      // ─── OPTIMIZED: USE RESEND BATCH API ───
      const CHUNK_SIZE = 100;
      const recipients = campaign.recipients;

      for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
        const chunk = recipients.slice(i, i + CHUNK_SIZE);

        const emailBatch = chunk.map((r) => {
          const vars = {
            contact_name: r.name ?? "",
            company_name: r.company ?? "",
            email: r.email,
          };
          return {
            from: FROM,
            to: [r.email],
            subject: merge(campaign.subject, vars),
            html: merge(campaign.body, vars),
          };
        });

        try {
          const { data, error } = await resend.batch.send(emailBatch);

          if (error) {
            throw new Error(error.message);
          }

          // Process batch results
          const resultData = (data as any)?.data;
          for (let j = 0; j < chunk.length; j++) {
            const r = chunk[j];
            const batchResult = resultData?.[j];
            const vars = {
              contact_name: r.name ?? "",
              company_name: r.company ?? "",
              email: r.email,
            };
            const subject = merge(campaign.subject, vars);

            // Check if individual email in batch failed or succeeded
            if (batchResult?.id) {
              await db.emailRecipient.update({
                where: { id: r.id },
                data: { status: "SENT", messageId: batchResult.id, sentAt: new Date() },
              });
              sentCount++;

              // Update organizer status to CONTACTED
              const matchingOrgs = await db.organizer.findMany({ where: { email: r.email } });
              for (const org of matchingOrgs) {
                const newStatus = org.outreachStatus === "NEW" || org.outreachStatus === "NEEDS_REVIEW" || org.outreachStatus === "READY"
                  ? "CONTACTED"
                  : org.outreachStatus;

                await db.organizer.update({
                  where: { id: org.id },
                  data: { outreachStatus: newStatus },
                });

                await db.contactActivity.create({
                  data: {
                    organizerId: org.id,
                    type: "EMAIL",
                    text: `ส่งอีเมลแคมเปญสำเร็จ: "${campaign.name}" (หัวข้อ: "${subject}")`,
                  },
                });
              }
            } else {
              // Batch send succeeded but this specific index failed (or no ID)
              await db.emailRecipient.update({
                where: { id: r.id },
                data: { status: "FAILED", error: "No Message ID returned from Resend Batch API" },
              });
              failCount++;
            }
          }
        } catch (err: any) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`[Background Queue] Batch failed, falling back to individual sending for chunk: ${msg}`);

          const INDIVIDUAL_CONCURRENCY = 5;
          for (let k = 0; k < chunk.length; k += INDIVIDUAL_CONCURRENCY) {
            const subChunk = chunk.slice(k, k + INDIVIDUAL_CONCURRENCY);
            await Promise.all(
              subChunk.map(async (r) => {
                const vars = {
                  contact_name: r.name ?? "",
                  company_name: r.company ?? "",
                  email: r.email,
                };
                const subject = merge(campaign.subject, vars);
                const htmlBody = merge(campaign.body, vars);

                try {
                  const { data, error } = await resend.emails.send({
                    from: FROM,
                    to: [r.email],
                    subject,
                    html: htmlBody,
                  });

                  if (error) throw new Error(error.message);

                  await db.emailRecipient.update({
                    where: { id: r.id },
                    data: { status: "SENT", messageId: data?.id ?? null, sentAt: new Date() },
                  });
                  sentCount++;

                  const matchingOrgs = await db.organizer.findMany({ where: { email: r.email } });
                  for (const org of matchingOrgs) {
                    const newStatus = org.outreachStatus === "NEW" || org.outreachStatus === "NEEDS_REVIEW" || org.outreachStatus === "READY"
                      ? "CONTACTED"
                      : org.outreachStatus;

                    await db.organizer.update({
                      where: { id: org.id },
                      data: { outreachStatus: newStatus },
                    });

                    await db.contactActivity.create({
                      data: {
                        organizerId: org.id,
                        type: "EMAIL",
                        text: `ส่งอีเมลแคมเปญสำเร็จ (โหมดสำรอง): "${campaign.name}" (หัวข้อ: "${subject}")`,
                      },
                    });
                  }
                } catch (subErr: any) {
                  const subMsg = subErr instanceof Error ? subErr.message : String(subErr);
                  await db.emailRecipient.update({
                    where: { id: r.id },
                    data: { status: "FAILED", error: subMsg },
                  });
                  failCount++;

                  const matchingOrgs = await db.organizer.findMany({ where: { email: r.email } });
                  for (const org of matchingOrgs) {
                    await db.contactActivity.create({
                      data: {
                        organizerId: org.id,
                        type: "EMAIL",
                        text: `ส่งอีเมลแคมเปญล้มเหลว: "${campaign.name}" (สาเหตุ: ${subMsg})`,
                      },
                    });
                  }
                }
              })
            );
          }
        }
      }
    } else {
      // ─── WITH ATTACHMENTS: BATCH IN PARALLEL CHUNKS (CONCURRENCY LIMIT: 5) ───
      const recipients = campaign.recipients;
      const CONCURRENCY = 5;

      for (let i = 0; i < recipients.length; i += CONCURRENCY) {
        const chunk = recipients.slice(i, i + CONCURRENCY);

        await Promise.all(
          chunk.map(async (r) => {
            const vars = {
              contact_name: r.name ?? "",
              company_name: r.company ?? "",
              email: r.email,
            };
            const subject = merge(campaign.subject, vars);
            const htmlBody = merge(campaign.body, vars);

            try {
              const { data, error } = await resend.emails.send({
                from: FROM,
                to: [r.email],
                subject,
                html: htmlBody,
                attachments: attachments.map((a) => ({
                  filename: a.filename,
                  content: Buffer.from(a.base64, "base64"),
                })),
              });

              if (error) throw new Error(error.message);

              await db.emailRecipient.update({
                where: { id: r.id },
                data: { status: "SENT", messageId: data?.id ?? null, sentAt: new Date() },
              });
              sentCount++;

              const matchingOrgs = await db.organizer.findMany({ where: { email: r.email } });
              for (const org of matchingOrgs) {
                const newStatus = org.outreachStatus === "NEW" || org.outreachStatus === "NEEDS_REVIEW" || org.outreachStatus === "READY"
                  ? "CONTACTED"
                  : org.outreachStatus;

                await db.organizer.update({
                  where: { id: org.id },
                  data: { outreachStatus: newStatus },
                });

                await db.contactActivity.create({
                  data: {
                    organizerId: org.id,
                    type: "EMAIL",
                    text: `ส่งอีเมลแคมเปญสำเร็จ: "${campaign.name}" (หัวข้อ: "${subject}")`,
                  },
                });
              }
            } catch (err: any) {
              const msg = err instanceof Error ? err.message : String(err);
              await db.emailRecipient.update({
                where: { id: r.id },
                data: { status: "FAILED", error: msg },
              });
              failCount++;

              const matchingOrgs = await db.organizer.findMany({ where: { email: r.email } });
              for (const org of matchingOrgs) {
                await db.contactActivity.create({
                  data: {
                    organizerId: org.id,
                    type: "EMAIL",
                    text: `ส่งอีเมลแคมเปญล้มเหลว: "${campaign.name}" (สาเหตุ: ${msg})`,
                  },
                });
              }
            }
          })
        );
      }
    }

    // Update overall campaign status
    await db.emailCampaign.update({
      where: { id: campaign.id },
      data: {
        status: failCount === campaign.recipients.length ? "FAILED" : "SENT",
        sentAt: new Date(),
      },
    });
  } catch (err) {
    console.error(`[Background Queue] Error processing campaign ${campaignId}`, err);
    await db.emailCampaign.update({
      where: { id: campaignId },
      data: { status: "FAILED" },
    }).catch(() => {});
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const body = await req.json();
    const { templateId, name, recipients, attachments = [] } = body as {
      templateId: number;
      name: string;
      recipients: Recipient[];
      attachments: AttachmentInput[];
    };

    if (!templateId || !name?.trim() || !recipients?.length) {
      return NextResponse.json({ error: "templateId, name, recipients required" }, { status: 400 });
    }

    const template = await prisma.emailTemplate.findUnique({ where: { id: templateId } });
    if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const campaign = await prisma.emailCampaign.create({
      data: {
        name: name.trim(),
        templateId,
        subject: template.subject,
        body: template.body,
        status: "SENDING",
        recipients: {
          create: recipients.map((r) => ({
            email: r.email,
            name: r.name ?? null,
            company: r.company ?? null,
            status: "PENDING",
          })),
        },
      },
    });

    // Fire & Forget background processing
    runEmailCampaignQueue(campaign.id, attachments).catch((err) => {
      console.error("[Background Queue Dispatch Error]", err);
    });

    return NextResponse.json(
      { campaignId: campaign.id, queued: true, total: recipients.length },
      { status: 201 }
    );
  } catch (err) {
    console.error("[email-campaigns POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
