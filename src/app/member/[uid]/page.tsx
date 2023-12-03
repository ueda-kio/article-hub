import { User } from '@prisma/client';
import ArticleList from './ArticleList';
import Form from './Form';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users as User[];
};

export default async function UserDetail({ params }: { params: { uid: string } }) {
  const users = await getUser();
  const user = users.find((user) => user.id === params.uid);
  if (!user) return <p>user not found</p>;
  return (
    <>
      <h1 className="text-2xl font-bold">User Detail</h1>
      <p>welcome {user.name} !</p>
      <br />
      <section>
        {/* @ts-expect-error Server Component */}
        <Form qiita={user.qiita} zenn={user.zenn} />
      </section>
      <br />
      <section>
        <h2 className="text-xl font-semibold">Articles</h2>
        {/* @ts-expect-error Server Component */}
        <ArticleList uid={user.id} />
      </section>
    </>
  );
}
