import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AdminUser = {
  id: number;
  role: "ADMIN";
};

type AdminAuthResult =
  | { user: AdminUser; error: null; status: 200 }
  | { user: null; error: string; status: 401 | 403 | 503 };

export async function getAdminUser(): Promise<AdminAuthResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { user: null, error: "กรุณาเข้าสู่ระบบ", status: 401 };
  }

  const sessionUser = session.user as typeof session.user & {
    id?: string;
    role?: string;
  };
  const id = Number(sessionUser.id);

  if (!Number.isInteger(id) || id <= 0) {
    return { user: null, error: "Session ผู้ใช้ไม่ถูกต้อง", status: 401 };
  }
  if (!prisma) {
    return { user: null, error: "ระบบฐานข้อมูลไม่พร้อมใช้งาน", status: 503 };
  }

  const databaseUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
  if (databaseUser?.role !== "ADMIN") {
    return { user: null, error: "เฉพาะผู้ดูแลระบบเท่านั้น", status: 403 };
  }

  return { user: { id, role: "ADMIN" }, error: null, status: 200 };
}