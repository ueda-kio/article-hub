import { Article, User } from '@prisma/client';
import ArticleList from './ArticleList';
import Form from './Form';
import TextArea from './TextArea';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user', {
    next: {
      tags: ['users'],
    },
  });
  const json = await res.json();
  return json.users as User[];
};

const getArticles = async (uid: string) => {
  const res = await fetch(`http://localhost:3000/api/article?creatorId=${uid}`, {
    next: {
      tags: ['articles'],
    },
  });
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
      <h1 className="text-2xl font-bold">User Detail</h1>
      <p>welcome {user.name} !</p>
      <br />
      <section>
        {/* @ts-expect-error Server Component */}
        {/* <Form qiita={user.qiita} zenn={user.zenn} /> */}
        <TextArea id={user.id} qiita={user.qiita} zenn={user.zenn} />
      </section>
      <br />
      <section>
        <h2 className="text-xl font-semibold">Articles</h2>
        <ArticleList fallback={articles} uid={user.id} />
      </section>
    </>
  );
}
