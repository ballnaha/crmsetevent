import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const ROLES = new Set(["ADMIN", "USER"]);
type Context = { params: Promise<{ id: string }> };

function parseId(id: string) {
  const value = Number(id);
  return Number.isInteger(value) && value > 0 ? value : null;
}

export async function GET(_request: Request, { params }: Context) {
  const auth = await getAdminUser();
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  const { id } = await params;
  const userId = parseId(id);
  if (!userId) {
    return NextResponse.json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
  }
  return NextResponse.json({ user });
}

export async function PATCH(request: Request, { params }: Context) {
  const auth = await getAdminUser();
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  try {
    const { id } = await params;
    const userId = parseId(id);
    if (!userId) {
      return NextResponse.json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { id: userId } });
    if (!existing) {
      return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const password = typeof input.password === "string" ? input.password : "";
    const role = typeof input.role === "string" ? input.role.toUpperCase() : existing.role;

    if (!name) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
    }
    if (password && password.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 });
    }
    if (!ROLES.has(role)) {
      return NextResponse.json({ error: "สิทธิ์ผู้ใช้ไม่ถูกต้อง" }, { status: 400 });
    }
    if (userId === auth.user.id && role !== existing.role) {
      return NextResponse.json({ error: "ไม่สามารถเปลี่ยนสิทธิ์บัญชีที่กำลังใช้งาน" }, { status: 400 });
    }

    if (existing.role === "ADMIN" && role !== "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        return NextResponse.json({ error: "ต้องมีผู้ดูแลระบบอย่างน้อย 1 คน" }, { status: 400 });
      }
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
        role,
        ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[users/[id] PATCH]", error);
    return NextResponse.json({ error: "ไม่สามารถแก้ไขผู้ใช้ได้" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const auth = await getAdminUser();
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  try {
    const { id } = await params;
    const userId = parseId(id);
    if (!userId) {
      return NextResponse.json({ error: "รหัสผู้ใช้ไม่ถูกต้อง" }, { status: 400 });
    }
    if (userId === auth.user.id) {
      return NextResponse.json({ error: "ไม่สามารถลบบัญชีที่กำลังใช้งาน" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { id: userId } });
    if (!existing) {
      return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
    }

    if (existing.role === "ADMIN") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        return NextResponse.json({ error: "ไม่สามารถลบผู้ดูแลระบบคนสุดท้าย" }, { status: 400 });
      }
    }

    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[users/[id] DELETE]", error);
    return NextResponse.json({ error: "ไม่สามารถลบผู้ใช้ได้" }, { status: 500 });
  }
}