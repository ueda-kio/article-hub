'use client';

import { Article } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import Link from 'next/link';
import { useState } from 'react';

const togglePublish = async (id: string, publish: boolean) => {
  const res = await fetch(`http://localhost:3000/api/article/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ publish: !publish }),
  });
  const json = await res.json();
  // TODO: ここでrevalidateTagを呼ぶとerror
  // revalidateTag('articles');
  // revalidatePath('/member/[uid]', 'page');
  // return json.article as Article;
};

function List({
  isPublish,
  articles,
  handleClickToggleButton,
}: {
  isPublish: boolean;
  articles: Article[];
  handleClickToggleButton: (id: string) => void;
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
                onClick={() => handleClickToggleButton(article.id)}
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
  // const publishList = articles.filter((article) => article.publish);
  // const unpublishList = articles.filter((article) => !article.publish);

  const [publishList, setPublishList] = useState(articles.filter((article) => article.publish));
  const [unpublishList, setUnpublishList] = useState(articles.filter((article) => !article.publish));

  const handleClickToggleButton = {
    patchArticlePublish: async function (id: string, publish: boolean) {
      const res = await fetch(`http://localhost:3000/api/article/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ publish: !publish }),
      });
      const json = await res.json();
      // TODO: ここでrevalidateTagを呼ぶとerror
      // revalidateTag('articles');
      // revalidatePath('/member/[uid]', 'page');
      // return json.article as Article;
    },
    publish: function (id: string) {
      const article = publishList.find((article) => article.id === id);
      if (article) {
        setPublishList(publishList.filter((article) => article.id !== id));
        setUnpublishList([article, ...unpublishList]);
        this.patchArticlePublish(id, true);
      }
    },
    unpublish: function (id: string) {
      const article = unpublishList.find((article) => article.id === id);
      if (article) {
        setUnpublishList(unpublishList.filter((article) => article.id !== id));
        setPublishList([article, ...publishList]);
        this.patchArticlePublish(id, false);
      }
    },
  };

  return (
    <>
      <List isPublish={true} articles={publishList} handleClickToggleButton={handleClickToggleButton.publish} />
      <List isPublish={false} articles={unpublishList} handleClickToggleButton={handleClickToggleButton.unpublish} />
    </>
  );
}
