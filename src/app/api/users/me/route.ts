import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getUserId(session: Session | null) {
  if (!session?.user) return null;

  const user = session.user as typeof session.user & { id?: string };
  const id = Number(user.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getUserId(session);

  if (!userId) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, updatedAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = getUserId(session);

  if (!userId) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const password = typeof input.password === "string" ? input.password : "";

    if (!name) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
    }
    if (password && password.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 });
    }

    const duplicate = await prisma.user.findFirst({
      where: { email, NOT: { id: userId } },
      select: { id: true },
    });
    if (duplicate) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      },
      select: { id: true, name: true, email: true, role: true, updatedAt: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[users/me PATCH]", error);
    return NextResponse.json({ error: "ไม่สามารถบันทึกข้อมูลผู้ใช้ได้" }, { status: 500 });
  }
}