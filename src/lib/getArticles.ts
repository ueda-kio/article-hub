import { NextResponse } from 'next/server';

export async function getQiitaArticles(qiitaUname: FormDataEntryValue, uid: string) {
  try {
    const token = process.env.QIITA_TOKEN;
    if (typeof token === 'undefined') {
      console.error('Access Token is undefined.');
      return false;
    }

    const res = await fetch(`https://qiita.com/api/v2/users/${qiitaUname}/items?page=1&per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const feed = (await res.json()) as {
      title?: string;
      url?: string;
      created_at?: string;
      likes_count?: number;
    }[];
    const articles = feed
      .map((post) => {
        const { title, url, likes_count, created_at } = post;
        if (typeof url !== 'string' || typeof title !== 'string' || typeof likes_count !== 'number') return false;

        return {
          site: 'qiita',
          title,
          url,
          likes_count,
          created_at,
          publish: true,
          creatorId: uid,
        } as const;
      })
      .filter((item): item is Exclude<typeof item, false> => item !== false);
    return articles;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getZennArticles(zennUname: FormDataEntryValue, uid: string) {
  const baseUrl = 'https://zenn.dev/';
  const endpoint = `${baseUrl}api/articles?username=${zennUname}`;

  try {
    const feed = (await (await fetch(endpoint)).json()) as {
      articles: {
        path?: string;
        title?: string;
        liked_count?: number;
      }[];
    };
    const articles = feed.articles
      .map((item) => {
        const { path, title, liked_count } = item;
        if (typeof path !== 'string' || typeof title !== 'string' || typeof liked_count !== 'number') return false;

        return {
          site: 'zenn',
          title,
          url: `${baseUrl}${path}`,
          likes_count: liked_count,
          publish: true,
          creatorId: uid,
        } as const;
      })
      .filter((item): item is Exclude<typeof item, false> => item !== false);

    return articles;
  } catch (e) {
    console.error(e);
    return false;
  }
}
