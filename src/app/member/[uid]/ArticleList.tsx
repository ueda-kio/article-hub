'use client';

import useArticles, { articleSWRKey } from '@/hooks/useArticles';
import { userRevalidateTag } from '@/hooks/useRevalidate';
import { Article } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { SWRConfig } from 'swr';

function _ArticleList({ uid }: { uid: string }) {
  const { data: articles, mutate } = useArticles(uid);
  const [publishList, setPublishList] = useState<Article[]>([]);
  const [unpublishList, setUnpublishList] = useState<Article[]>([]);

  if (articles && !publishList.length && !unpublishList.length) {
    setPublishList(articles.filter((article) => article.publish));
    setUnpublishList(articles.filter((article) => !article.publish));
  }

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
    userRevalidateTag('articles');
    mutate();
  };

  return (
    <>
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

export default function ArticleList({ fallback, uid }: { fallback: Article[]; uid: string }) {
  return (
    <SWRConfig value={{ fallback: { [articleSWRKey(uid)]: fallback } }}>
      <_ArticleList uid={uid} />
    </SWRConfig>
  );
}
