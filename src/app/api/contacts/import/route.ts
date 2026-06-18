import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ImportRow = {
  companyName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  note?: string;
};

export async function POST(request: NextRequest) {
  try {
    if (!prisma) throw new Error("No prisma");

    const { rows } = await request.json() as { rows: ImportRow[] };
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "No rows provided" }, { status: 400 });
    }

    let created = 0;
    let skipped = 0;

    for (const row of rows) {
      const companyName = String(row.companyName ?? "").trim();
      if (!companyName) { skipped++; continue; }

      const email = row.email ? String(row.email).trim().toLowerCase() : null;

      // Skip if duplicate — match by email first, then companyName
      const existing = await prisma.organizer.findFirst({
        where: email
          ? { OR: [{ email }, { companyName }] }
          : { companyName },
        select: { id: true },
      });

      if (existing) { skipped++; continue; }

      await prisma.organizer.create({
        data: {
          companyName,
          contactName: row.contactName ? String(row.contactName).trim() : null,
          phone:       row.phone       ? String(row.phone).trim()       : null,
          email:       email || null,
          website:     row.website     ? String(row.website).trim()     : null,
          facebook:    row.facebook    ? String(row.facebook).trim()    : null,
          note:        row.note        ? String(row.note).trim()        : null,
          outreachStatus: "NEW",
          lockedFields: [],
        },
      });
      created++;
    }

    return NextResponse.json({ created, skipped, total: rows.length });
  } catch (err) {
    console.error("POST /api/contacts/import failed", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
