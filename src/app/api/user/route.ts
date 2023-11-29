import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return NextResponse.json({ ok: true, users });
}
