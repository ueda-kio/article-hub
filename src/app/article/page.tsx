import { getArticles } from '@/lib/getResources';
import ArticleList from './ArticleList';

export default async function Page() {
  const articles = await getArticles();
  return <ArticleList articles={articles} />;
}
