// NextAuthのProviderを使うために必要なレイアウト。サイト全体を囲む。
// サインインしていない場合はサインインへの導線を表示。
// また、サインインしている場合はサインアウトへの導線を表示。
// その他、サイトのメタデータを設定する。

import Provider from '@/components/Provider';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Article Hub',
  description: '会社メンバーの投稿記事を一覧で取得するサイト。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* sessionProviderでラップする */}
      <body>
        <Provider>
          {/* サインインしていない場合はサインインへの導線を表示。 */}
          {/* また、サインインしている場合はサインアウトへの導線を表示。 */}
          <header>
            <h1>
              <Link href="/">Article Hub</Link>
            </h1>
          </header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
