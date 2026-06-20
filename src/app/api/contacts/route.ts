import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedStatuses = new Set([
  "NEW", "NEEDS_REVIEW", "READY", "CONTACTED", "PROPOSAL", "NOT_INTERESTED",
]);

export async function GET() {
  // 1. Try Organizer table (created by sync route)
  try {
    if (!prisma) throw new Error("No prisma");

    const organizers = await prisma.organizer.findMany({
      include: {
        events: {
          select: { id: true, title: true, startsAt: true, source: true, category: true },
          orderBy: { startsAt: "desc" },
        },
      },
      orderBy: { companyName: "asc" },
    });

    // Query last sent email campaign date for each email address
    const emailAddresses = organizers
      .map((o) => o.email?.toLowerCase())
      .filter((e): e is string => !!e);

    const emailSentLogs = await prisma.emailRecipient.findMany({
      where: {
        email: { in: emailAddresses },
        status: "SENT",
        sentAt: { not: null }
      },
      select: { email: true, sentAt: true },
      orderBy: { sentAt: "desc" }
    });

    const emailToLastSent = new Map<string, string>();
    for (const log of emailSentLogs) {
      const emailLower = log.email.toLowerCase();
      if (log.sentAt && !emailToLastSent.has(emailLower)) {
        emailToLastSent.set(emailLower, log.sentAt.toISOString());
      }
    }

    if (organizers.length > 0) {
      return NextResponse.json({
        contacts: organizers.map((o) => {
          const mapped = mapOrganizer(o);
          return {
            ...mapped,
            lastSentAt: o.email ? (emailToLastSent.get(o.email.toLowerCase()) || null) : null
          };
        }),
        source: "database"
      });
    }
  } catch (err) {
    console.warn("Organizer table query failed", err);
  }

  // 2. Fallback: extract from Event table (before any sync has run)
  try {
    if (!prisma) throw new Error("No prisma");

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { organizerName: { not: null } },
          { organizerEmail: { not: null } },
        ],
      },
      select: {
        id: true, title: true, startsAt: true, source: true, category: true,
        organizerName: true, organizerContactName: true,
        organizerPhone: true, organizerEmail: true,
        organizerWebsite: true, organizerFacebook: true,
      },
    });

    const contactMap = new Map<string, ContactFromEvent>();
    for (const e of events) {
      const key = e.organizerEmail?.toLowerCase() || e.organizerName?.toLowerCase() || "";
      if (!key) continue;
      if (!contactMap.has(key)) {
        contactMap.set(key, {
          id: key,
          companyName: e.organizerName || key,
          contactName: e.organizerContactName || null,
          phone: e.organizerPhone || null,
          email: e.organizerEmail || null,
          website: e.organizerWebsite || null,
          facebook: e.organizerFacebook || null,
          outreachStatus: "NEW",
          note: null,
          events: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      const c = contactMap.get(key)!;
      c.events.push({
        id: e.id,
        title: e.title,
        startsAt: new Date(e.startsAt).toISOString(),
        source: e.source,
        category: e.category || "General Event",
      });
    }

    return NextResponse.json({
      contacts: Array.from(contactMap.values()).sort((a, b) => a.companyName.localeCompare(b.companyName)),
      source: "events_fallback",
    });
  } catch (err) {
    console.warn("Events fallback for contacts failed", err);
  }

  return NextResponse.json({ contacts: [], source: "empty" });
}

const lockableFields = ["companyName", "contactName", "phone", "email", "website", "facebook"] as const;
type LockableField = typeof lockableFields[number];

export async function POST(request: NextRequest) {
  try {
    if (!prisma) throw new Error("No prisma");
    const body = await request.json();
    const companyName = String(body.companyName ?? "").trim();
    if (!companyName) return NextResponse.json({ error: "companyName required" }, { status: 400 });

    const organizer = await prisma.organizer.create({
      data: {
        companyName,
        contactName: body.contactName ? String(body.contactName).trim() : null,
        phone:       body.phone       ? String(body.phone).trim()       : null,
        email:       body.email       ? String(body.email).trim()       : null,
        website:     body.website     ? String(body.website).trim()     : null,
        facebook:    body.facebook    ? String(body.facebook).trim()    : null,
        note:        body.note        ? String(body.note).trim()        : null,
        outreachStatus: allowedStatuses.has(body.outreachStatus) ? body.outreachStatus : "NEW",
        lockedFields: [],
      },
      include: { events: { select: { id: true, title: true, startsAt: true, source: true, category: true }, orderBy: { startsAt: "desc" } } },
    });
    return NextResponse.json({ contact: mapOrganizer(organizer) }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contacts failed", err);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!prisma) throw new Error("No prisma");

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 });
    }
    if (body.outreachStatus !== undefined && !allowedStatuses.has(body.outreachStatus)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
    }

    const current = await prisma.organizer.findUnique({ where: { id }, select: { lockedFields: true } });
    const currentLocked = new Set<string>(Array.isArray(current?.lockedFields) ? current.lockedFields as string[] : []);

    const updateData: Record<string, unknown> = {};

    // Status / note — never auto-locked (always user-managed)
    if (body.outreachStatus !== undefined) updateData.outreachStatus = body.outreachStatus;
    if (body.note !== undefined) updateData.note = body.note;

    // Contact fields — auto-lock any field the user explicitly edits
    const fieldsBeingEdited: LockableField[] = [];
    if (body.companyName !== undefined) { updateData.companyName = String(body.companyName).trim() || undefined; fieldsBeingEdited.push("companyName"); }
    if (body.contactName !== undefined) { updateData.contactName = body.contactName ? String(body.contactName).trim() : null; fieldsBeingEdited.push("contactName"); }
    if (body.phone      !== undefined) { updateData.phone      = body.phone      ? String(body.phone).trim()      : null; fieldsBeingEdited.push("phone"); }
    if (body.email      !== undefined) { updateData.email      = body.email      ? String(body.email).trim()      : null; fieldsBeingEdited.push("email"); }
    if (body.website    !== undefined) { updateData.website    = body.website    ? String(body.website).trim()    : null; fieldsBeingEdited.push("website"); }
    if (body.facebook   !== undefined) { updateData.facebook   = body.facebook   ? String(body.facebook).trim()   : null; fieldsBeingEdited.push("facebook"); }

    // Merge locks: add newly edited fields, honour explicit unlocks from UI
    if (fieldsBeingEdited.length > 0 || body.lockedFields !== undefined) {
      if (body.lockedFields !== undefined) {
        // UI sent an explicit lock list (user toggled locks manually)
        updateData.lockedFields = Array.isArray(body.lockedFields) ? body.lockedFields : [];
      } else {
        // Auto-lock all fields the user just edited
        fieldsBeingEdited.forEach((f) => currentLocked.add(f));
        updateData.lockedFields = Array.from(currentLocked);
      }
    }

    const updated = await prisma.organizer.update({ where: { id }, data: updateData });
    return NextResponse.json({ success: true, organizer: updated });
  } catch (err) {
    console.error("PATCH /api/contacts failed", err);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

type ContactFromEvent = {
  id: string;
  companyName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  outreachStatus: string;
  note: string | null;
  events: { id: number; title: string; startsAt: string; source: string; category: string }[];
  createdAt: string;
  updatedAt: string;
};

function mapOrganizer(o: {
  id: number;
  companyName: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebook: string | null;
  outreachStatus: string;
  note: string | null;
  lockedFields: unknown;
  createdAt: Date;
  updatedAt: Date;
  events: { id: number; title: string; startsAt: Date; source: string; category: string | null }[];
}) {
  return {
    id: o.id,
    companyName: o.companyName,
    contactName: o.contactName,
    phone: o.phone,
    email: o.email,
    website: o.website,
    facebook: o.facebook,
    outreachStatus: o.outreachStatus,
    note: o.note,
    lockedFields: Array.isArray(o.lockedFields) ? o.lockedFields as string[] : [],
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    events: o.events.map((e) => ({
      id: e.id,
      title: e.title,
      startsAt: new Date(e.startsAt).toISOString(),
      source: e.source,
      category: e.category || "General Event",
    })),
  };
}
