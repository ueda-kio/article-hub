import { getServerSession } from '@/auth';
import { getArticles, getUsers } from '@/lib/getResources';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleList from './ArticleList';
import TextArea from './TextArea';

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
