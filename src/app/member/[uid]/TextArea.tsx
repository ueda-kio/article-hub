'use client';

import { articleSWRKey } from '@/hooks/useArticles';
import handleSubmitUname from '@/serverActions/handleSubmitUname';
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
              className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
      <br />
      <form name="zenn" onSubmit={handleSubmit}>
        <p>
          <label>
            <span>zenn: </span>
            <input
              type="text"
              name="zenn"
              value={zennUname}
              onChange={(e) => setZennUname(e.target.value)}
              className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </p>
      </form>
    </>
  );
}
