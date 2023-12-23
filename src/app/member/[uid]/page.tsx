import { getServerSession } from '@/auth';
import { getArticles, getUsers } from '@/lib/getResources';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleList from './ArticleList';
import TextArea from './TextArea';
import MyPage from './MyPage';

const getSessionId = async () => {
  const session = await getServerSession();
  return session?.user.id;
};

export default async function UserDetail({ params }: { params: { uid: string } }) {
  const uid = params.uid;
  const [[user], articles, sessionId] = await Promise.all([getUsers(uid), getArticles(uid), getSessionId()]);
  const isMyPage = uid === sessionId;
  if (!user) {
    notFound();
  }

  // TODO: MyPage と OtherPage で分ける？
  return (
    <>
      <h1 className="text-2xl font-bold">{isMyPage ? `おかえり！${user.name}` : `${user.name}のページだよ`}</h1>
      <br />
      {isMyPage ? (
        <MyPage user={user} articles={articles} />
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
