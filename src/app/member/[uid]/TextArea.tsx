'use client';

import { articleSWRKey } from '@/hooks/useArticles';
import { userRevalidateTag } from '@/hooks/useRevalidate';
import { getQiitaArticles, getZennArticles } from '@/lib/getArticles';
import handleSubmitUname from '@/lib/handleSubmitUname';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export default function TextArea({ id, qiita, zenn }: { id: string; qiita: string | null; zenn: string | null }) {
  const { mutate } = useSWRConfig();
  const [qiitaUname, setQiitaUname] = useState(qiita ?? '');
  const [zennUname, setZennUname] = useState(zenn ?? '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const site = e.currentTarget.name;
    const uname = formData.get(site);
    if ((site !== 'qiita' && site !== 'zenn') || typeof uname !== 'string') return;

    await handleSubmitUname(site, uname);

    // (async () => {
    //   await fetch(`/api/user/${id}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       [site]: uname,
    //     }),
    //   });
    //   userRevalidateTag('users');
    // })();

    // (async () => {
    //   const articles = await (async () => (site === 'qiita' ? await getQiitaArticles(uname, id) : getZennArticles(uname, id)))();
    //   await fetch('/api/article', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       uid: id,
    //       site: site,
    //       articles,
    //     }),
    //   });
    // })();
    mutate(articleSWRKey(id));
  };

  const handleClickButton = async () => {
    console.log(id);
    mutate(articleSWRKey(id));
  };

  return (
    <>
      <form name="qiita" onSubmit={handleSubmit}>
        <p>
          <label>
            <span>qiita: </span>
            <input
              type="text"
              name="qiita"
              value={qiitaUname}
              onChange={(e) => setQiitaUname(e.target.value)}
              className="bg-gray-800 text-white py-2 px-4 rounded"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
      <form name="zenn" onSubmit={handleSubmit}>
        <p>
          <label>
            <span>zenn: </span>
            <input
              type="text"
              name="zenn"
              value={zennUname}
              onChange={(e) => setZennUname(e.target.value)}
              className="bg-gray-800 text-white py-2 px-4 rounded"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
      <br />
      <p>
        <button onClick={handleClickButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Mutate Button
        </button>
      </p>
    </>
  );
}
