import { Article } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

export const articleSWRKey = (creatorId: string) => `/api/article?creatorId=${creatorId}` as const;

export default function useArticles(creatorId: string) {
  const fetcher: Fetcher<Article[], string> = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json.articles;
  };

  return useSWR(articleSWRKey(creatorId), fetcher);
}
