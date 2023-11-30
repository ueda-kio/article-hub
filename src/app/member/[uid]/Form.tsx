import { authOptions } from '@/auth';
import { getQiitaArticles, getZennArticles } from '@/lib/getArticles';
import { getServerSession } from 'next-auth';

async function action(params: FormData) {
  'use server';

  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? '';

  const dataArr = params.entries();
  const table = Object.fromEntries(dataArr);

  const qiitaUname = table['qiita'] ?? '';
  const zennUname = table['zenn'] ?? '';
  if (qiitaUname === '' && zennUname === '') return;

  // qiitaとzennがっちゃんこした配列
  const articles = (await Promise.all([getQiitaArticles(qiitaUname, id), getZennArticles(zennUname, id)])).flat();

  await fetch('http://localhost:3000/api/article', {
    method: 'POST',
    body: JSON.stringify({
      uid: id,
      articles,
    }),
    next: {
      tags: ['articles'],
    },
  });
}

export default async function Form() {
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
