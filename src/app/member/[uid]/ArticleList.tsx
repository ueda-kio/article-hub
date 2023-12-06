'use client';

import { userRevalidateTag } from '@/hooks/useRevalidate';
import { Article } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';

function List({
  isPublish,
  articles,
  handleClickToggleButton,
}: {
  isPublish: boolean;
  articles: Article[];
  handleClickToggleButton: (id: string, publish: boolean) => Promise<void>;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{isPublish || '非'}表示リスト</h2>
      <ul>
        {!articles.length ? (
          <>リストはありません！</>
        ) : (
          articles.map((article) => (
            <li key={article.id}>
              <button
                onClick={() => handleClickToggleButton(article.id, isPublish)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isPublish && '非'}表示
              </button>
              <Link href={article.url} target="_blank" passHref>
                {article.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default function ArticleList({ articles }: { articles: Article[] }) {
  // TODO: クライアント側でfetchするほうがよりリアルタイム反映となりよいかも
  const [publishList, setPublishList] = useState(articles.filter((article) => article.publish));
  const [unpublishList, setUnpublishList] = useState(articles.filter((article) => !article.publish));

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

    await fetch(`http://localhost:3000/api/article/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ publish: !publish }),
    });
    userRevalidateTag('articles');
  };

  return (
    <>
      <List isPublish={true} articles={publishList} handleClickToggleButton={handleClickToggleButton} />
      <List isPublish={false} articles={unpublishList} handleClickToggleButton={handleClickToggleButton} />
    </>
  );
}
