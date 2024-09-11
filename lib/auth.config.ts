import type { DefaultSession, NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

import "next-auth/jwt"

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: email } as { email: string },
        });

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password as string, user.password);

        if (!user || !passwordsMatch) {
          return null;
        }

        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone ?? undefined,
          emailVerified: user.emailVerified ?? null,
          image: user.image ?? null,
          birthday: user.birthday ?? null,
          gender: user.gender ?? null,
          role: user.role,
          lastLogin: user.lastLogin ?? null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        } as unknown as User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // session: async ({ session, token }) => {
    //   return {
    //     ...session,
    //     user: {
    //       id: token.id as string,
    //       email: token.email as string,
    //       name: token.name as string,
    //       surname: token.surname as string,
    //       phone: token.phone as string,
    //       birthday:
    //         token.birthday instanceof Date
    //           ? token.birthday.toISOString()
    //           : undefined,
    //       gender: token.gender as string,
    //       role: token.role as string,
    //       lastLogin: token.lastLogin as Date,
    //       emailVerified: token.emailVerified
    //         ? session?.user.emailVerified
    //         : null,
    //     },
    //   } as unknown as DefaultSession;
    // },
    // jwt: async ({ token, user, trigger, session }) => {
    //   if (user) {
    //     const u = user as unknown as any;
    //     return {
    //       ...token,
    //       id: u.id,
    //       email: u.email,
    //       name: u.name,
    //       surname: u.surname,
    //       phone: u.phone,
    //       birthday: u.birthday,
    //       gender: u.gender,
    //       role: u.role,
    //       lastLogin: u.lastLogin,
    //     };
    //   }

    //   if (trigger === "update" && session) {
    //     token.name = session.name;
    //     token.surname = session.surname;
    //     token.email = session.email;
    //     token.phone = session.phone;
    //     token.birthday = session.birthday;
    //     token.gender = session.gender;
    //   }

    //   return token;
    // },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user as unknown as any;
        token.id = u.id;
        token.name = u.name;
        token.surname = u.surname;
        token.email = u.email;
        token.image = u.image;
        token.phone = u.phone;
        token.birthday = u.birthday;
        token.gender = u.gender;
        token.emailVerified = u.emailVerified;
        token.role = u.role;
        token.lastLogin = u.lastLogin;
        token.createdAt = u.createdAt;
        token.updatedAt = u.updatedAt;
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
    async session({ session, token }) {
      if (!token) {
        return session;
      }

      return {
        ...session,
        user: {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          surname: token.surname as string,
          phone: token.phone as string,
          birthday: token.birthday as Date ?? null,
          gender: token.gender as string,
          role: token.role as string,
          lastLogin: token.lastLogin as Date,
          emailVerified: token.emailVerified
            ? session?.user.emailVerified
            : null,
        },
      } as unknown as DefaultSession;
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


declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}