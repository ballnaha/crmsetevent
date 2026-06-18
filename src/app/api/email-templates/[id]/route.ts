import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const { id } = await params;
    const template = await prisma.emailTemplate.findUnique({ where: { id: Number(id) } });
    if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ template });
  } catch (err) {
    console.error("[email-templates/[id] GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const { id } = await params;
    const { name, subject, body } = await req.json();
    if (!name?.trim() || !subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "name, subject, body required" }, { status: 400 });
    }
    const template = await prisma.emailTemplate.update({
      where: { id: Number(id) },
      data: { name: name.trim(), subject: subject.trim(), body: body.trim() },
    });
    return NextResponse.json({ template });
  } catch (err) {
    console.error("[email-templates/[id] PUT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    if (!prisma) return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
    const { id } = await params;
    await prisma.emailTemplate.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[email-templates/[id] DELETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
