// Auth.js（旧NextAuth）を利用した認証機能を実装する。
// このファイルは、認証に関するルーティングを記述する。
// ProviderはGoogleを利用する。

import NextAuth, { NextAuthOptions } from "next-auth";
import { Session as NextAuthSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface Session extends Omit<NextAuthSession, 'user'> {
  id?: string;
  user: UserWithId;
}
interface UserWithId extends User {
  id: string;
}
export const OPTIONS: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "dummy",
      clientSecret: process.env.GOOGLE_SECRET ?? "dummy",
    }),
  ],
  callbacks: {
    session: async ({ session, user }: {
      session: Session;
      user: UserWithId;
    }) => {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
  },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST }