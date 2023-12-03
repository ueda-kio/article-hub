import Link from 'next/link';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user', { next: { tags: ['users'] } });
  const json = await res.json();
  return json.users;
};

const getArticles = async () => {
  const res = await fetch('http://localhost:3000/api/article', { next: { tags: ['articles'] } });
  const json = await res.json();
  return json.articles;
};

export default async function List() {
  // TODO: レスポンスの型定義どうする問題
  const user = await getUser();
  const articles = await getArticles();
  // console.log(`user（${new Date().toLocaleString('ja-JA', { timeZone: 'UTC' })}）: `, user);
  // return <>{<pre>{JSON.stringify(user, null, 2)}</pre>}</>;
  return (
    <>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">article</h2>
        <ul className="list-disc m-4 pl-4">
          {articles.map((article: any) => (
            <li key={article.id}>
              <Link href={article.url} target="_blank" passHref className="text-blue-500 hover:underline">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">user</h2>
        <ul className="list-disc m-4 pl-4">
          {user.map((user: any) => (
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
