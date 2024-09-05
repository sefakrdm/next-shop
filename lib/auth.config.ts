import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { User } from "next-auth";

const isValidCredentials = (credentials: Record<string, unknown> | undefined): boolean => {
  // Your validation logic here
  return true; // or false based on validation
};

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

        if(!isValidCredentials(credentials)) {
          throw new Error("Invalid credentials!");
       }

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({ where: { email } });

          if (!user || !user.password) return null;

          await db.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              password: user.password,
              phone: user.phone ?? undefined,
              emailVerified: user.emailVerified ?? null,
              image: user.image ?? null,
              birthday: user.birthday ?? null,
              gender: user.gender ?? null,
              role: user.role,
              lastLogin: user.lastLogin ?? null,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          surname: token.surname as string,
          phone: token.phone as string,
          birthday: token.birthday as Date,
          gender: token.gender as string,
          role: token.role as string,
          lastLogin: token.lastLogin as Date,
          emailVerified: token.emailVerified
            ? session?.user.emailVerified
            : null,
        },
      };
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.name,
          surname: u.surname,
          phone: u.phone,
          birthday: u.birthday,
          gender: u.gender,
          role: u.role,
          lastLogin: u.lastLogin,
        };
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.surname = session.surname;
        token.email = session.email;
        token.phone = session.phone;
        token.birthday = session.birthday;
        token.gender = session.gender;
      }

      return token;
    },
  },
  pages: {
    signIn: "/account/login",
    signOut: "/account/login",
    error: "/account/login",
    verifyRequest: "/account/login",
    newUser: "/account/register",
  },
} satisfies NextAuthConfig;
