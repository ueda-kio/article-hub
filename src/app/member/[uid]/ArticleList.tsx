'use client';

import useArticles from '@/hooks/useArticles';
import { revalidateTagFromClient } from '@/serverActions/revalidate';
import { Article } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ArticleList({ fallback, uid }: { fallback: Article[]; uid: string }) {
  const { data: articles, mutate } = useArticles(uid);
  const [publishList, setPublishList] = useState<Article[]>(fallback.filter((article) => article.publish));
  const [unpublishList, setUnpublishList] = useState<Article[]>(fallback.filter((article) => !article.publish));

  useEffect(() => {
    if (articles) {
      setPublishList(articles.filter((article) => article.publish));
      setUnpublishList(articles.filter((article) => !article.publish));
    }
    // console.log('mutate...');
  }, [articles]);

  const handleClickToggleButton = async (id: string, publish: boolean) => {
    if (publish) {
      const article = publishList.find((article) => article.id === id);
      if (article) {
        setPublishList(publishList.filter((article) => article.id !== id));
        setUnpublishList([article, ...unpublishList].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
      }
    } else {
      const article = unpublishList.find((article) => article.id === id);
      if (article) {
        setUnpublishList(unpublishList.filter((article) => article.id !== id));
        setPublishList([article, ...publishList].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
      }
    }

    await fetch(`/api/article/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ publish: !publish }),
    });
    revalidateTagFromClient('articles');
    // TODO: ここで mutate() する必要ある？
    mutate();
  };

  return (
    <>
      {/* TODO: ローディングアニメーションをつけたい。 */}
      {/* {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-75 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
      )} */}
      <section>
        <h2 className="text-2xl font-bold">表示リスト</h2>
        <ul>
          {publishList.length ? (
            publishList.map((article) => (
              <li key={article.id}>
                <button
                  onClick={() => handleClickToggleButton(article.id, true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  非表示
                </button>
                <Link href={article.url} target="_blank" passHref>
                  {article.title}
                </Link>
              </li>
            ))
          ) : (
            <>リストはありません！</>
          )}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold">非表示リスト</h2>
        <ul>
          {unpublishList.length ? (
            unpublishList.map((article) => (
              <li key={article.id}>
                <button
                  onClick={() => handleClickToggleButton(article.id, false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  表示
                </button>
                <Link href={article.url} target="_blank" passHref>
                  {article.title}
                </Link>
              </li>
            ))
          ) : (
            <>リストはありません！</>
          )}
        </ul>
      </section>
    </>
  );
}

// fallback をあきらめて手動で初期表示の記事リストを作る
// export default function ArticleList({ fallback, uid }: { fallback: Article[]; uid: string }) {
//   const initPublishList = useMemo(() => fallback.filter((article) => article.publish), [fallback]);
//   const intiUnpublishList = useMemo(() => fallback.filter((article) => !article.publish), [fallback]);
//   return (
//     <SWRConfig>
//       <_ArticleList uid={uid} initPublishList={initPublishList} intiUnpublishList={intiUnpublishList} />
//     </SWRConfig>
//   );
// }
