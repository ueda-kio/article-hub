import { getArticles } from '@/lib/getResources';
import Link from 'next/link';
import { Suspense } from 'react';

async function List() {
  const articles = await getArticles();
  return (
    <ul className="list-disc m-4 pl-4">
      {articles.map(
        (article) =>
          article.publish && (
            <li key={article.id}>
              <Link href={article.url} className="text-blue-500 hover:underline" target="_blank" passHref>
                {article.title}
              </Link>
            </li>
          ),
      )}
    </ul>
  );
}

export default async function ArticlesList() {
  return (
    <section className="mt-4">
      <h2 className="text-xl font-semibold">article</h2>
      {/* TODO: loading */}
      <Suspense fallback={<>loading...</>}>
        {/* @ts-expect-error Server Component */}
        <List />
      </Suspense>
      <Link href="/article" className="text-blue-500 hover:underline">
        記事一覧ページへ →
      </Link>
    </section>
  );
}
