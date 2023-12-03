import { Article } from '@prisma/client';
import Link from 'next/link';

const getArticles = async (uid: string) => {
  const res = await fetch(`http://localhost:3000/api/article?uid=${uid}`, {
    next: {
      tags: ['articles'],
    },
  });
  const json = await res.json();
  return json.articles as Article[];
};

export default async function ArticleList({ uid }: { uid: string }) {
  const articles = await getArticles(uid);
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={article.url} target="_blank" passHref>
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
