import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { signInSchema } from "./app/auth/validators/auth-validator"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../lib/prisma"

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" }, email: { label: "Email", type: "email" } },
    authorize(c) {
        const parsedCredentials =  signInSchema.safeParse(c)
        if (!parsedCredentials.success) return {
            error: parsedCredentials.error
        }
        const {email, password}  =  parsedCredentials.data

        console.log("logeado", parsedCredentials)
        return {email, password}
    },
  }),
  Google
]
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
})