import { getUsers } from '@/lib/getResources';
import Link from 'next/link';
import { Suspense } from 'react';

async function List() {
  const user = await getUsers();
  return (
    <ul className="list-disc m-4 pl-4">
      {user.map((user) => (
        <li key={user.id}>
          <Link href={`/member/${user.id}`} className="text-blue-500 hover:underline">
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Page() {
  return (
    <>
      <section>
        <h2>user</h2>
        <Suspense fallback={<>loading...</>}>
          {/* @ts-expect-error Server Component */}
          <List />
        </Suspense>
      </section>
    </>
  );
}
