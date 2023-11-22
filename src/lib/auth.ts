import {
 NextAuthOptions,
 getServerSession,
} from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import "dotenv/config";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
 // @ts-ignore
 adapter: DrizzleAdapter(db),
 secret: process.env.NEXTAUTH_SECRET!,
 providers: [
  CredentialsProvider({
   name: "credentials",
   credentials: {
    email: { label: "email", type: "text" },
    hashedPassword: {
     label: "hashedPassword",
     type: "hashedPassword",
    },
   },
   async authorize(credentials) {
    if (
     !credentials?.email ||
     !credentials?.hashedPassword
    ) {
     throw new Error("Invalid Credentials");
    }

    const user = await db.query.users.findFirst({
     where: (user, { eq }) =>
      eq(user.email, credentials.email),
    });

    if (!user || !user?.hashedPassword) {
     throw new Error("Invalid Credentials");
    }

    const isCorrectPassword = await bcrypt.compare(
     credentials.hashedPassword,
     user.hashedPassword
    );

    if (!isCorrectPassword) {
     throw new Error("Invalid Credentials");
    }

    return user;
   },
  }),
 ],
 pages: {
  signIn: "/sign-in",
 },
 debug: process.env.NODE_ENV === "development",
 session: {
  strategy: "jwt",
 },
 callbacks: {
  async session({ session, token }) {
   // do something to session
   if (token) {
    session.user.id = token.id;
    session.user.email = token.email;
   }
   return session;
  },
  async jwt({ token, user }) {
   const email = token.email;

   const dbUser = (
    await db
     .select()
     .from(users)
     .where(eq(users.email, email as string))
   )[0];

   if (!dbUser) {
    token.id = user.id;
    return token;
   }
   return {
    id: dbUser.id,
    email: dbUser.email,
   };
  },
 },
};

export const getAuthSession = () =>
 getServerSession(authOptions);
