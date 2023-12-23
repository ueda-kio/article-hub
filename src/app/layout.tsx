import Provider from '@/components/Provider';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Article Hub',
  description: '会社メンバーの投稿記事を一覧で取得するサイト。',
};

export const fetchCache = 'default-cache';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Provider>
          <Header />
          <main className="container mx-auto my-4 px-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
