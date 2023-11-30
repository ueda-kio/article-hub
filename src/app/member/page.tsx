import { User } from '@prisma/client';
import Link from 'next/link';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users as User[];
};

export default async function MembersList() {
  const user = await getUser();
  return (
    <>
      <section>
        <h2>user</h2>
        <ul>
          {user.map((user) => (
            <Link href={`/member/${user.id}`}>{user.name}</Link>
          ))}
        </ul>
      </section>
    </>
  );
}
