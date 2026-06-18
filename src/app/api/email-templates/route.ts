import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const templates = await prisma.emailTemplate.findMany({
      orderBy: { updatedAt: "desc" },
      select: { id: true, name: true, subject: true, body: true, createdAt: true, updatedAt: true },
    });
    return NextResponse.json({ templates });
  } catch (err) {
    console.error("[email-templates GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const { name, subject, body } = await req.json();
    if (!name?.trim() || !subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "name, subject, body required" }, { status: 400 });
    }
    const template = await prisma.emailTemplate.create({ data: { name: name.trim(), subject: subject.trim(), body: body.trim() } });
    return NextResponse.json({ template }, { status: 201 });
  } catch (err) {
    console.error("[email-templates POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
