import { User } from '@prisma/client';
import Link from 'next/link';

const getUsers = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users as User[];
};

export default async function Page() {
  const user = await getUsers();
  return (
    <>
      <section>
        <h2>user</h2>
        <ul className="list-disc m-4 pl-4">
          {user.map((user) => (
            <li key={user.id}>
              <Link href={`/member/${user.id}`} className="text-blue-500 hover:underline">
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
