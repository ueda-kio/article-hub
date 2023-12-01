import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import List from './List';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/api/auth/signin">Sign in</a>
          </li>
          <li>
            <a href="/api/auth/signout">Sign out</a>
          </li>
        </ul>
      </nav>
      <span>server session: </span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* @ts-expect-error Server Component */}
      <List />
    </>
  );
}
