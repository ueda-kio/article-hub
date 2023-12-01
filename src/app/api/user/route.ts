import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json({ ok: true, users });
}

export async function PATCH(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  // query is 'foo' if the URL is /api/user?query=foo
  const query = searchParams.get('uid');

  const res = await req.json();
}
