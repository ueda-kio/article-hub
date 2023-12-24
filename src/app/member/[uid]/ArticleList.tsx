'use client';

import useArticles from '@/hooks/useSwrArticles';
import { revalidateTagFromClient } from '@/serverActions/revalidate';
import { Article } from '@prisma/client';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function List({
  articleList,
  isPublish,
  handleClickToggleButton,
}: {
  articleList: Article[];
  isPublish: boolean;
  handleClickToggleButton: (id: string, publish: boolean) => void;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{isPublish ? undefined : '非'}表示リスト</h2>
      <ul>
        {articleList.length ? (
          articleList.map((article) => (
            <li key={article.id}>
              <button
                onClick={() => handleClickToggleButton(article.id, isPublish)}
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
  );
}

export default function ArticleList({
  fallback,
  uid,
  isFetching,
  setIsFetching,
}: {
  fallback: Article[];
  uid: string;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: articles, mutate } = useArticles(uid);
  const [articleLists, setArticleLists] = useState<{ publishList: Article[]; unpublishList: Article[] }>({
    publishList: fallback.filter((article) => article.publish),
    unpublishList: fallback.filter((article) => !article.publish),
  });

  useEffect(() => {
    if (articles) {
      setArticleLists({
        publishList: articles.filter((article) => article.publish),
        unpublishList: articles.filter((article) => !article.publish),
      });
      setIsFetching(false);
    }
  }, [articles, setIsFetching]);

  const updateArticleLists = (id: string, publish: boolean) => {
    const { publishList, unpublishList } = articleLists;
    if (publish) {
      const article = publishList.find((article) => article.id === id);
      if (article) {
        setArticleLists({
          publishList: publishList.filter((article) => article.id !== id),
          unpublishList: [article, ...unpublishList].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
        });
      }
    } else {
      const article = unpublishList.find((article) => article.id === id);
      if (article) {
        setArticleLists({
          unpublishList: unpublishList.filter((article) => article.id !== id),
          publishList: [article, ...publishList].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
        });
      }
    }
  };

  const handleClickToggleButton = async (id: string, publish: boolean) => {
    updateArticleLists(id, publish);

    await fetch(`/api/article/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ publish: !publish }),
    });
    revalidateTagFromClient('articles');
    mutate();
  };

  return (
    <div className="relative">
      {/* TODO: ローディングアニメーション */}
      {isFetching && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-75 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
      )}
      <List articleList={articleLists.publishList} isPublish={true} handleClickToggleButton={handleClickToggleButton} />
      <br />
      <List articleList={articleLists.unpublishList} isPublish={false} handleClickToggleButton={handleClickToggleButton} />
    </div>
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
