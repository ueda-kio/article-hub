import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import List from './List';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p>
        <Link href="/hoge">hoge</Link>
      </p>
      <span>server session: </span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* @ts-expect-error Server Component */}
      <List />
    </>
  );
}
