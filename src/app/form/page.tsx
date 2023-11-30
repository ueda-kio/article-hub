// 簡易的なform要素を含んだNext.jsページ
// server componentとして動作する

import { authOptions } from '@/auth';
import { getQiitaArticles } from '@/lib/getArticles';
import { getServerSession } from 'next-auth';

async function action(params: FormData, uid: string) {
  'use server';

  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? '';

  const dataArr = params.entries();
  const table = Object.fromEntries(dataArr);

  const qiitaUname = table['qiita'] ?? '';
  const zennUname = table['zenn'] ?? '';
  if (qiitaUname === '' && zennUname === '') return true;

  const qiitaArticles = await getQiitaArticles(qiitaUname, uid);
  if (qiitaArticles === false) return;

  await fetch('http://localhost:3000/api/article', {
    method: 'POST',
    body: JSON.stringify({
      uid: id,
      articles: qiitaArticles,
    }),
    next: {
      tags: ['articles'],
    },
  });
}

export default async function Page() {
  return (
    <>
      <form action={action as any}>
        <p>
          <label>
            <span>qiita: </span>
            <input type="text" name="qiita" className="bg-gray-800 text-white" />
          </label>
        </p>
        <p>
          <label>
            <span>zenn: </span>
            <input type="text" name="zenn" className="bg-gray-800 text-white" />
          </label>
        </p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
