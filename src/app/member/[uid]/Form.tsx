import { authOptions } from '@/auth';
import { getQiitaArticles, getZennArticles } from '@/lib/getArticles';
import { Site } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';

async function run(params: FormData, site: Site) {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? '';

  const uname = params.get(site);
  if (uname === null) return;

  fetch(`http://localhost:3000/api/user/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      [site]: uname,
    }),
    next: {
      tags: ['users'],
    },
  });

  const articles = await (async () => (site === 'qiita' ? await getQiitaArticles(uname, id) : getZennArticles(uname, id)))();
  fetch('http://localhost:3000/api/article', {
    method: 'POST',
    body: JSON.stringify({
      uid: id,
      site: site,
      articles,
    }),
    next: {
      tags: ['articles'],
    },
  });
}

async function setQiitaUname(params: FormData) {
  'use server';
  await run(params, 'qiita');
  revalidateTag('articles');
  // revalidatePath('/member/[uid]', 'page');
}

async function setZennUname(params: FormData) {
  'use server';

  await run(params, 'zenn');
  revalidateTag('articles');
  // revalidatePath('/member/[uid]', 'page');
}

export default async function Form({ qiita, zenn }: { qiita: string | null; zenn: string | null }) {
  return (
    <>
      <form action={setQiitaUname as any}>
        <p>
          <label>
            <span>qiita: </span>
            <input type="text" name="qiita" defaultValue={qiita ?? ''} className="bg-gray-800 text-white py-2 px-4 rounded" />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
      <form action={setZennUname as any}>
        <p>
          <label>
            <span>zenn: </span>
            <input type="text" name="zenn" defaultValue={zenn ?? ''} className="bg-gray-800 text-white py-2 px-4 rounded" />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
    </>
  );
}
