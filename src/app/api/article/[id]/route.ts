import { prisma } from '@/lib/prismaClient';
import { Article } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const payload: Partial<Article> = await req.json();

  try {
    await prisma.article.update({
      where: { id: params.id },
      data: payload,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e });
  }
}
