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
      <section className="p-4 m-2 bg-gray-200">
        <h2 className="text-lg font-bold mb-2">article</h2>
        <ul>
          {articles.map((article: any) => (
            <li key={article.id} className="mb-1">
              <Link href={article.url} target="_blank" passHref className="text-blue-500 hover:underline">
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2>user</h2>
        <ul>
          {user.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <Link href="/member">membersページへ →</Link>
      </section>
    </>
  );
}
