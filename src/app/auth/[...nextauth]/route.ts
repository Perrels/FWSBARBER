import { db } from "@/app/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
});

export { handler as GET, handler as POST };
