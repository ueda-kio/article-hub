// // Auth.js（旧NextAuth）を利用した認証機能を実装する。
// // このファイルは、認証に関するルーティングを記述する。
// // ProviderはGoogleを利用する。

// import NextAuth, { NextAuthOptions } from "next-auth";
// import { Session, User } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // interface Session extends Omit<NextAuthSession, 'user'> {
// //   id?: string;
// //   user: UserWithId;
// // }
// interface UserWithId extends User {
//   id: string;
// }
// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID ?? "dummy",
//       clientSecret: process.env.GOOGLE_SECRET ?? "dummy",
//     }),
//   ],
//   callbacks: {
//     async signIn({user}) {
//       user;
//       return true;
//     },
//     async session ({ session, user, token }) {
//       token.id;
//       session.user.id;
//       session.user.id = token.id;
//       console.log('session\n', new Date().toLocaleString('ja-JA', {timeZone: 'UTC'}), session);
//       return Promise.resolve(session);
//     },
//     jwt: async ({ token, user }) => {
//       console.log('jwt\n',new Date().toLocaleString('ja-JA', {timeZone: 'UTC'}), token)
//       if (user) {
//         token.id = user.id;
//       }
//       return Promise.resolve(token);
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { handler } from "@/auth"
export { handler as GET, handler as POST };