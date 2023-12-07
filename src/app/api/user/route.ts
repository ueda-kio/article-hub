import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('id');

  try {
    const users = await (async () => {
      if (uid) {
        const _user = await prisma.user.findUnique({
          where: { id: uid },
        });
        if (!_user) {
          throw new Error('user not found');
        }
        return [_user];
      } else {
        return await prisma.user.findMany();
      }
    })();
    return NextResponse.json({ ok: true, users });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, e });
  }
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // query is 'foo' if the URL is /api/user?query=foo
  const query = searchParams.get('uid');

  const res = await req.json();
}
