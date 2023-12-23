import { getUsers } from '@/lib/getResources';
import Link from 'next/link';
import { Suspense } from 'react';

async function List() {
  const users = await getUsers();
  return (
    <ul className="list-disc m-4 pl-4">
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/member/${user.id}`} className="text-blue-500 hover:underline">
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function MembersList() {
  return (
    <section className="mt-4">
      <h2 className="text-xl font-semibold">user</h2>
      {/* TODO: loading */}
      <Suspense fallback={<>loading...</>}>
        {/* @ts-expect-error Server Component */}
        <List />
      </Suspense>
      <Link href="/member" className="text-blue-500 hover:underline">
        membersページへ →
      </Link>
    </section>
  );
}
