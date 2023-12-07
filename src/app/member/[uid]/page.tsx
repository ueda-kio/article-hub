import { getServerSession } from '@/auth';
import { Article, User } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleList from './ArticleList';
import TextArea from './TextArea';

const getUser = async (uid: string) => {
  const res = await fetch('http://localhost:3000/api/user', { next: { tags: ['users'] } });
  const json = await res.json();
  return (json.users as User[]).find((user) => user.id === uid);
};

const getArticles = async (uid: string) => {
  const res = await fetch(`http://localhost:3000/api/article?creatorId=${uid}`, { next: { tags: ['articles'] } });
  const json = await res.json();
  return json.articles as Article[];
};

const getSessionId = async () => {
  const session = await getServerSession();
  return session?.user.id;
};

export default async function UserDetail({ params }: { params: { uid: string } }) {
  const uid = params.uid;
  const [user, articles, sessionId] = await Promise.all([getUser(uid), getArticles(uid), getSessionId()]);
  const isMyPage = uid === sessionId;
  if (!user) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{isMyPage ? `おかえり！${user.name}` : `${user.name}のページだよ`}</h1>
      <br />
      {isMyPage ? (
        <>
          <section>
            <TextArea id={user.id} qiita={user.qiita} zenn={user.zenn} />
          </section>
          <br />
          <section>
            <h2 className="text-xl font-semibold">Articles</h2>
            <ArticleList fallback={articles} uid={user.id} />
          </section>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
