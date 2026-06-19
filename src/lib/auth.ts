import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

if (!prisma) {
  throw new Error("Prisma client is not initialized");
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!prisma) {
          throw new Error("ระบบฐานข้อมูลไม่พร้อมใช้งาน");
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
        }

        try {
          // Check if any user exists in the database
          const userCount = await prisma.user.count();
          if (userCount === 0) {
            // Seed a default administrator account
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await prisma.user.create({
              data: {
                email: "admin@eventsync.com",
                name: "CRM Operator",
                password: hashedPassword,
                role: "ADMIN",
              },
            });
            console.log("Successfully seeded default admin user (admin@eventsync.com / admin123)");
          }
        } catch (e) {
          console.error("Error during auto-seeding user table:", e);
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("ไม่พบอีเมลนี้ในระบบหรือรหัสผ่านไม่ถูกต้อง");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("รหัสผ่านไม่ถูกต้อง");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || "CRM Operator",
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
