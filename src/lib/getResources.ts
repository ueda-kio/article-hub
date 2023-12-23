import { Article, User } from '@prisma/client';
import { BASE_URL } from './baseUrl';

export const getUsers = async (uid?: string) => {
  const url = `${BASE_URL}/api/user${uid ? `?id=${uid}` : ''}`;
  const tag = uid ? `users-${uid}` : 'users';
  try {
    const res = await fetch(url, { next: { tags: [tag] } });
    const json = await res.json();
    if (!json.ok) throw new Error(json.e.name as string);
    return json.users as User[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getArticles = async (creatorId?: string) => {
  const url = `${BASE_URL}/api/article${creatorId ? `?creatorId=${creatorId}` : ''}`;
  // TODO: uid 単位で revalidate しても結局全体を revalidate しているので、uid は不要かもしれない
  // const tag = creatorId ? `articles-${creatorId}` : 'articles';
  try {
    const res = await fetch(url, { next: { tags: ['articles'] } });
    const json = await res.json();
    if (!json.ok) throw new Error(json.e.name as string);
    return json.articles as Article[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
