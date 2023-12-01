import { Article, User } from '@prisma/client';
import Link from 'next/link';
import Form from './Form';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users as User[];
};

const getArticles = async (uid: string) => {
  const res = await fetch(`http://localhost:3000/api/article?uid=${uid}`);
  const json = await res.json();
  return json.articles as Article[];
};

export default async function UserDetail({ params }: { params: { uid: string } }) {
  const users = await getUser();
  const articles = await getArticles(params.uid);
  const user = users.find((user) => user.id === params.uid);
  if (!user) return <p>user not found</p>;
  return (
    <>
      <h1>User Detail</h1>
      <p>{user.name}</p>
      <br />
      <section>
        <h2>Articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={article.url} target="_blank" passHref>
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {/* @ts-expect-error Server Component */}
      <Form qiita={user.qiita} zenn={user.zenn} />
    </>
  );
}
