'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeaderIcon({ imagePath }: { imagePath: string }) {
  return (
    <Link href="/api/auth/signout">
      <Image src={imagePath} width={36} height={36} alt="" className="rounded-full"></Image>
    </Link>
  );
}
