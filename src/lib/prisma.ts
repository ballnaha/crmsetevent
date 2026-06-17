import { PrismaClient } from "@/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

let prismaInstance: PrismaClient | null = null;

function parseDatabaseUrl(urlStr: string) {
  try {
    const url = new URL(urlStr);
    return {
      host: url.hostname || "localhost",
      port: url.port ? parseInt(url.port, 10) : 3306,
      user: url.username || "root",
      password: url.password ? decodeURIComponent(url.password) : "",
      database: url.pathname.replace(/^\//, ""),
    };
  } catch (e) {
    console.error("Failed to parse DATABASE_URL:", e);
    return null;
  }
}

try {
  if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
  } else {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL environment variable is missing");
    }

    const dbConfig = parseDatabaseUrl(dbUrl);
    if (!dbConfig) {
      throw new Error("Invalid DATABASE_URL configuration");
    }

    const adapter = new PrismaMariaDb({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      connectionLimit: 10,
    });

    prismaInstance = new PrismaClient({ adapter });
  }

  if (process.env.NODE_ENV !== "production" && prismaInstance) {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (e) {
  console.warn("Prisma Client failed to initialize. Falling back to local cache.", e);
}

export const prisma = prismaInstance;


