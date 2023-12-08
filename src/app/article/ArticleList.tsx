'use client';

import { Article } from '@prisma/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function ArticleList({ articles }: { articles: Article[] }) {
  // const searchParams = useSearchParams().get('sort');
  const [sortOption, setSortOption] = useState('newest');
  const [sortedArticles, setSortedArticles] = useState([...articles]);
  // const router = useRouter();

  // TODO: urlのクエリ参照して表示切り替えするとちらつきが見える
  // useEffect(() => {
  //   router.replace(`/article?sort=${sortOption}`);
  // }, [sortOption, articles, router]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    const sorted = [...sortedArticles];
    switch (e.target.value) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'likes':
        sorted.sort((a, b) => b.likes_count - a.likes_count);
        break;
    }
    setSortedArticles(sorted);
  };

  return (
    <>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="bg-gray-200 border border-gray-300 rounded-md py-2 px-4 text-gray-700"
      >
        <option value="newest">投稿が新しい</option>
        <option value="oldest">投稿が古い</option>
        <option value="likes">likeが多い</option>
      </select>
      <ul className="list-disc m-4 pl-4">
        {sortedArticles.map(
          (article) =>
            article.publish && (
              <li key={article.id}>
                <Link href={article.url} className="text-blue-500 hover:underline" target="_blank" passHref>
                  {article.title}
                </Link>
              </li>
            ),
        )}
      </ul>
    </>
  );
}
