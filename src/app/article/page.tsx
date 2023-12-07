import { Article } from '@prisma/client';
import ArticleList from './ArticleList';

const getArticles = async () => {
  const res = await fetch('http://localhost:3000/api/article', { next: { tags: ['articles'] } });
  const json = await res.json();
  return json.articles as Article[];
};

export default async function Page() {
  const articles = await getArticles();
  return <ArticleList articles={articles} />;
}
