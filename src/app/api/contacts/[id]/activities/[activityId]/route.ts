import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; activityId: string }> }
) {
  const { id, activityId } = await params;
  const organizerId = Number(id);
  const actId = Number(activityId);

  if (!Number.isInteger(organizerId) || organizerId <= 0 || !Number.isInteger(actId) || actId <= 0) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    if (!prisma) throw new Error("No prisma");
    await prisma.contactActivity.delete({
      where: { id: actId, organizerId },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE activity failed", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
