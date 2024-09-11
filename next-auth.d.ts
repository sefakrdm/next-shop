import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      password: string;
      phone: string | null;
      emailVerified: Date | null;
      image: string | null;
      birthday: Date | null;
      gender: string | null;
      role: string;
      lastLogin: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string | null;
    emailVerified: Date | null;
    image: string | null;
    birthday: Date | null;
    gender: string | null;
    role: string;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string | null;
    emailVerified: Date | null;
    image: string | null;
    birthday: Date | null;
    gender: string | null;
    role: string;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
}
