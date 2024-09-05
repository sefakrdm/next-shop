import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // Add role to session user
    } & DefaultSession["user"];
  }

  interface User {
    role: string; // Add role to user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}