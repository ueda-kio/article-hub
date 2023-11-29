const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json;
};

export default async function List() {
  // TODO: レスポンスの型定義どうする問題
  const user = await getUser();
  // console.log(`user（${new Date().toLocaleString('ja-JA', { timeZone: 'UTC' })}）: `, user);
  return <>{<pre>{JSON.stringify(user, null, 2)}</pre>}</>;
}
