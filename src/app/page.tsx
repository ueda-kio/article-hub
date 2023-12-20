import { Suspense } from 'react';
import List from './List';

export default async function Home() {
  return (
    <>
      {/* TODO: loading */}
      <Suspense fallback={<>loading...</>}>
        {/* @ts-expect-error Server Component */}
        <List />
      </Suspense>
    </>
  );
}
