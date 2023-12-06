import { Article } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

/** `/api/article?creatorId=${creatorId}` */
export const articleSWRKey = (creatorId: string) => `/api/article?creatorId=${creatorId}`;

export default function useArticles(creatorId: string) {
  const fetcher: Fetcher<Article[], string> = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json.articles;
  };

  return useSWR(articleSWRKey(creatorId), fetcher);
}
