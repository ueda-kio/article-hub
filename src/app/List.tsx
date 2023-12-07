import { getArticles, getUsers } from '@/lib/getResources';
import Link from 'next/link';

export default async function List() {
  // TODO: レスポンスの型定義どうする問題
  const users = await getUsers();
  const articles = await getArticles();

  return (
    <>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">article</h2>
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
        <Link href="/article" className="text-blue-500 hover:underline">
          記事一覧ページへ →
        </Link>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">user</h2>
        <ul className="list-disc m-4 pl-4">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/member/${user.id}`} className="text-blue-500 hover:underline">
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/member" className="text-blue-500 hover:underline">
          membersページへ →
        </Link>
      </section>
    </>
  );
}
