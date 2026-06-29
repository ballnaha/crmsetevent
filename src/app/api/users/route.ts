import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const ROLES = new Set(["ADMIN", "USER"]);

export async function GET() {
  const auth = await getAdminUser();
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!prisma) {
    return NextResponse.json({ error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน" }, { status: 503 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ users, currentUserId: auth.user.id });
  } catch (error) {
    console.error("[users GET]", error);
    return NextResponse.json({ error: "ไม่สามารถโหลดรายชื่อผู้ใช้ได้" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await getAdminUser();
  if (!auth.user) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
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
    const role = typeof input.role === "string" ? input.role.toUpperCase() : "USER";

    if (!name) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 });
    }
    if (!ROLES.has(role)) {
      return NextResponse.json({ error: "สิทธิ์ผู้ใช้ไม่ถูกต้อง" }, { status: 400 });
    }

    const duplicate = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (duplicate) {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("[users POST]", error);
    return NextResponse.json({ error: "ไม่สามารถเพิ่มผู้ใช้ได้" }, { status: 500 });
  }
}