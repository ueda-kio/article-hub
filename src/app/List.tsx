import { Article, User } from '@prisma/client';
import Link from 'next/link';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user', { next: { tags: ['users'] } });
  const json = await res.json();
  return json.users as User[];
};

const getArticles = async () => {
  const res = await fetch('http://localhost:3000/api/article', { next: { tags: ['articles'] } });
  const json = await res.json();
  return json.articles as Article[];
};

export default async function List() {
  // TODO: レスポンスの型定義どうする問題
  const user = await getUser();
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
                  <Link href={article.url} target="_blank" passHref>
                    {article.title}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">user</h2>
        <ul className="list-disc m-4 pl-4">
          {user.map((user) => (
            <li key={user.id}>
              <Link href={`/member/${user.id}`} className="text-blue-500 hover:underline">
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/member">membersページへ →</Link>
      </section>
    </>
  );
}
