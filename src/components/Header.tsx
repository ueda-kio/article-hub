import { getServerSession } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import HeaderIcon from './HeaderIcon';

async function Icon() {
  const session = await getServerSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <HeaderIcon imagePath={session?.user?.image ?? '/public/person-placeholder.jpg'} />
      ) : (
        <Link href="/api/auth/signin" className="ml-4">
          <button className="bg-transparent hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-gray-500">Login</button>
        </Link>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header className="flex justify-between items-center sticky top-0 py-4 px-2 shadow-md">
      <h1>
        <Link href="/" className="underline hover:no-underline font-bold">
          Article Hub
        </Link>
      </h1>
      <Suspense fallback={<>loading...</>}>
        {/* @ts-expect-error Server Component */}
        <Icon />
      </Suspense>
    </header>
  );
}
