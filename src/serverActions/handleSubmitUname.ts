'use server';

import { getServerSession } from '@/auth';
import { BASE_URL } from '@/lib/baseUrl';
import { Site } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { getQiitaArticles, getZennArticles } from '../lib/getArticles';

export default async function handleSubmitUname(site: Site, uname: string) {
  const session = await getServerSession();
  const uid = session?.user?.id ?? '';

  await Promise.all([
    fetch(`${BASE_URL}/api/user/${uid}`, {
      method: 'PUT',
      body: JSON.stringify({
        [site]: uname,
      }),
      next: { tags: [`users-${uid}`] },
    }),
    (async () => {
      const articles = await (async () => (site === 'qiita' ? await getQiitaArticles(uname, uid) : getZennArticles(uname, uid)))();
      return fetch(`${BASE_URL}/api/article`, {
        method: 'POST',
        body: JSON.stringify({
          uid,
          site,
          articles,
        }),
        next: { tags: ['articles'] },
      });
    })(),
  ]).finally(() => {
    revalidateTag('articles');
    revalidateTag('users');
  });
  return Promise.resolve();
}
