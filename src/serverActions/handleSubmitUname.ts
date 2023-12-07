'use server';

import { getServerSession } from '@/auth';
import { Site } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { getQiitaArticles, getZennArticles } from '../lib/getArticles';

export default async function handleSubmitUname(site: Site, uname: string) {
  const session = await getServerSession();
  const uid = session?.user?.id ?? '';

  await Promise.all([
    fetch(`http://localhost:3000/api/user/${uid}`, {
      method: 'PUT',
      body: JSON.stringify({
        [site]: uname,
      }),
      next: { tags: ['users'] },
    }),
    (async () => {
      const articles = await (async () => (site === 'qiita' ? await getQiitaArticles(uname, uid) : getZennArticles(uname, uid)))();
      return fetch('http://localhost:3000/api/article', {
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
    // TODO: id指定してrevalidateする
    revalidateTag('articles');
  });
  return Promise.resolve();
}
