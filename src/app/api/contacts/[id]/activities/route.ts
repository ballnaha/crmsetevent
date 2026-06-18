import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedTypes = new Set(["CALL", "EMAIL", "MEETING", "PROPOSAL", "NOTE"]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organizerId = Number(id);
  if (!Number.isInteger(organizerId) || organizerId <= 0) {
    return NextResponse.json({ activities: [] }, { status: 400 });
  }

  try {
    if (!prisma) throw new Error("No prisma");
    const activities = await prisma.contactActivity.findMany({
      where: { organizerId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ activities });
  } catch (err) {
    console.error("GET activities failed", err);
    return NextResponse.json({ activities: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const organizerId = Number(id);
  if (!Number.isInteger(organizerId) || organizerId <= 0) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    if (!prisma) throw new Error("No prisma");
    const body = await req.json();
    const type = String(body.type || "NOTE");
    const text = String(body.text || "").trim();

    if (!allowedTypes.has(type) || !text) {
      return NextResponse.json({ success: false, message: "Invalid type or empty text" }, { status: 400 });
    }

    const activity = await prisma.contactActivity.create({
      data: { organizerId, type, text },
    });
    return NextResponse.json({ success: true, activity });
  } catch (err) {
    console.error("POST activity failed", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
