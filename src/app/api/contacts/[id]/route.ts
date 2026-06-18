import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const { id } = await params;
    const organizerId = Number(id);
    if (!Number.isInteger(organizerId) || organizerId <= 0) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    // Unlink events before deleting (set organizerId = null)
    await prisma.event.updateMany({
      where: { organizerId },
      data: { organizerId: null },
    });

    await prisma.contactActivity.deleteMany({ where: { organizerId } });
    await prisma.organizer.delete({ where: { id: organizerId } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contacts/[id] DELETE]", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
