/**
 * 渡されたQiitaのユーザー名から記事一覧を取得する。
 * @param {string} qiitaUname Qiitaのユーザー名
 * @param {string} uid ユーザーID
 * @returns {Promise<import('@prisma/client').ArticleCreateInput[]>}
 */
export async function getQiitaArticles(qiitaUname: FormDataEntryValue, uid: string) {
  const token = process.env.QIITA_TOKEN;
  if (typeof token === 'undefined') {
    console.error('Access Token is undefined.');
    return [];
  }

  if (qiitaUname === '') return [];

  try {
    const res = await fetch(`https://qiita.com/api/v2/users/${qiitaUname}/items?page=1&per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch Qiita articles.');

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
    return [];
  }
}

/**
 * 渡されたZennのユーザー名から記事一覧を取得する。
 * @param {string} zennUname Zennのユーザー名
 * @param {string} uid ユーザーID
 * @returns {Promise<import('@prisma/client').ArticleCreateInput[]>}
 */
export async function getZennArticles(zennUname: FormDataEntryValue, uid: string) {
  if (zennUname === '') return [];
  const baseUrl = 'https://zenn.dev/';
  const endpoint = `${baseUrl}api/articles?username=${zennUname}`;

  try {
    const feed = (await (await fetch(endpoint)).json()) as {
      articles: {
        path?: string;
        title?: string;
        liked_count?: number;
        published_at?: string;
      }[];
    };
    if (!feed.articles) throw new Error('Failed to fetch Zenn articles.');

    const articles = feed.articles
      .map((item) => {
        const { path, title, liked_count, published_at } = item;
        if (typeof path !== 'string' || typeof title !== 'string' || typeof liked_count !== 'number') return false;

        return {
          site: 'zenn',
          title,
          url: `${baseUrl}${path}`,
          likes_count: liked_count,
          publish: true,
          created_at: published_at,
          creatorId: uid,
        } as const;
      })
      .filter((item): item is Exclude<typeof item, false> => item !== false);

    return articles;
  } catch (e) {
    console.error(e);
    return [];
  }
}
