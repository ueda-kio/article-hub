// NextAuthのProviderを使うために必要なレイアウト。サイト全体を囲む。
// サインインしていない場合はサインインへの導線を表示。
// また、サインインしている場合はサインアウトへの導線を表示。
// その他、サイトのメタデータを設定する。

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Article Hub",
  description: "会社メンバーの投稿記事を一覧で取得するサイト。",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="ja">
      {/* sessionProviderでラップする */}
      <body>
        <SessionProvider session={session}>
          {/* サインインしていない場合はサインインへの導線を表示。 */}
          {/* また、サインインしている場合はサインアウトへの導線を表示。 */}
          <nav>
            <ul>
              <li>
                <a href="/api/auth/signin">Sign in</a>
              </li>
              <li>
                <a href="/api/auth/signout">Sign out</a>
              </li>
            </ul>
          </nav>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
