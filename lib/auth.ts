import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (credentials == null) return null;

        const user = await UserModel.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
    newUser: "/account/register",
    error: "/account/login",
  },
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /^\/account(\/.*)?$/,
        /\/order\/(.*)/,
        /\/admin/,
    ];
      const { pathname } = request.nextUrl;
      if (pathname === "/account/register") {
        return true;
      }
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          isAdmin: user.isAdmin,
          phone: user.phone || null,
          address: user.address || null,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          email: user.email,
          name: user.name,
          surname: user.surname,
          phone: user.phone || null,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
        if(token) {
            session.user = token.user;
        }
        return session;
    }
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);