import Link from 'next/link';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users;
};

const getArticles = async () => {
  const res = await fetch('http://localhost:3000/api/article');
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
      <section>
        <h2>article</h2>
        <ul>
          {articles.map((article: any) => (
            <li key={article.id}>
              <Link href={article.url} target="_blank" passHref>
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
