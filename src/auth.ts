import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "../lib/prisma";
import { sigInWithCredentials } from "./actions/auth/auth-actions";
import { signInSchema } from "./app/auth/validators/auth-validator";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      password: { label: "Password", type: "password" },
      email: { label: "Email", type: "email" },
    },
    async authorize(c) {
      const parsedCredentials = signInSchema.safeParse(c);
      if (!parsedCredentials.success) return null;

      const { email, password } = parsedCredentials.data;
      const user = await sigInWithCredentials(email, password);

      if (!user) {
        return null;
      }
      return user;
    },
  }),
  Google,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token }) {
      const userDb = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });

      token.roles = userDb?.role;
      token.id = userDb?.id;
      token.emailVerified = userDb?.emailVerified;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.roles = token.roles as string[];
      session.user.emailVerified = token.emailVerified as Date | null;
      return session;
    },
  },
});
