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

export async function GET() {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const campaigns = await prisma.emailCampaign.findMany({
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
      include: { recipients: true },
    });

    let sentCount = 0;
    let failCount = 0;

    for (const recipient of campaign.recipients) {
      const vars = {
        contact_name: recipient.name ?? "",
        company_name: recipient.company ?? "",
        email: recipient.email,
      };
      const subject = merge(template.subject, vars);
      const htmlBody = merge(template.body, vars);

      try {
        const { data, error } = await resend.emails.send({
          from: FROM,
          to: [recipient.email],
          subject,
          html: htmlBody,
          attachments: attachments.map((a) => ({
            filename: a.filename,
            content: Buffer.from(a.base64, "base64"),
          })),
        });

        if (error) throw new Error(error.message);

        await prisma.emailRecipient.update({
          where: { id: recipient.id },
          data: { status: "SENT", messageId: data?.id ?? null, sentAt: new Date() },
        });
        sentCount++;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        await prisma.emailRecipient.update({
          where: { id: recipient.id },
          data: { status: "FAILED", error: msg },
        });
        failCount++;
      }
    }

    await prisma.emailCampaign.update({
      where: { id: campaign.id },
      data: { status: failCount === recipients.length ? "FAILED" : "SENT", sentAt: new Date() },
    });

    return NextResponse.json({ campaignId: campaign.id, sent: sentCount, failed: failCount }, { status: 201 });
  } catch (err) {
    console.error("[email-campaigns POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
