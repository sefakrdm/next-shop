import NextAuth, { DefaultSession, DefaultUser } from "next-auth";


declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string | null;
            email?: string | null;
            name?: string | null;
            surname?: string | null;
            phone?: string | null;
            isAdmin?: boolean;
        } & DefaultSession["user"]
    }

    export interface User extends DefaultUser {
        _id?: string;
        email?: string;
        name?: string;
        surname?: string;
        phone?: string;
        isAdmin?: boolean;
    }
}