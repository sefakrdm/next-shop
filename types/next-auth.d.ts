import NextAuth, { DefaultSession, DefaultUser } from "next-auth";


declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string | null;
            email?: string | null;
            name?: string | null;
            surname?: string | null;
            phone?: string | null;
            birthday?: string | null;
            gender?: string | null;
            isAdmin?: boolean;
            image?: string | null;
            role?: string | null;
            lastLogin?: string | null;
            accounts?: Account[] | null;
            Address?: Address[] | null;
            sessions?: Session[] | null;
            Authenticator?: Authenticator[] | null;
            Favorite?: Favorite[] | null;
            Order?: Order[] | null;
            Review?: Review[] | null;
            createdAt?: string | null;
            updatedAt?: string | null;
        } & DefaultSession["user"]
    }

    export interface User extends DefaultUser {
        _id?: string;
        email?: string;
        name?: string;
        surname?: string;
        phone?: string;
        birthday?: string;
        gender?: string;
        isAdmin?: boolean;
        image?: string;
        role?: string;
        lastLogin?: string;
        accounts?: Account[];
        Address?: Address[];
        sessions?: Session[];
        Authenticator?: Authenticator[];
        Favorite?: Favorite[];
        Order?: Order[];
        Review?: Review[];
        createdAt?: string;
        updatedAt?: string;
    }
}