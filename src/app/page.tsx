import List from './List';

export default async function Home() {
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
      {/* @ts-expect-error Server Component */}
      <List />
    </>
  );
}
