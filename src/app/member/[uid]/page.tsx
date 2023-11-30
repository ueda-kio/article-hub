import { User } from '@prisma/client';

const getUser = async () => {
  const res = await fetch('http://localhost:3000/api/user');
  const json = await res.json();
  return json.users as User[];
};

export default async function UserDetail({ params }: { params: { uid: string } }) {
  const users = await getUser();
  const user = users.find((user) => user.id === params.uid);
  if (!user) return <p>user not found</p>;
  return (
    <>
      <h1>User Detail</h1>
      <p>{user.name}</p>
    </>
  );
}
