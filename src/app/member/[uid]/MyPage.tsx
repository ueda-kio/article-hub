'use client';

import { Article, User } from '@prisma/client';
import { useState } from 'react';
import ArticleList from './ArticleList';
import TextArea from './TextArea';

export default function MyPage({ user, articles }: { user: User; articles: Article[] }) {
  const [isFetching, setIsFetching] = useState(false);

  const toggleIsFetching = (isFetching: boolean) => {
    setIsFetching(isFetching);
  };

  return (
    <>
      <section>
        <TextArea user={user} toggleIsFetching={toggleIsFetching} />
      </section>
      <br />
      <section>
        <h2 className="text-xl font-semibold">Articles</h2>
        <ArticleList fallback={articles} uid={user.id} isFetching={isFetching} />
      </section>
    </>
  );
}
