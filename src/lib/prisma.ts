import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

let prismaInstance: PrismaClient | null = null;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  
  if (process.env.NODE_ENV !== "production" && prismaInstance) {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (e) {
  console.warn("Prisma Client failed to initialize. Falling back to local cache.");
}

export const prisma = prismaInstance;

