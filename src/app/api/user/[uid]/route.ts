import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { uid: string } }) {
  const { qiita, zenn } = await req.json();

  // const obj = (await req.json()) as {
  //   qiita?: string;
  //   zenn?: string;
  // };
  // `obj`から`undefined`なプロパティを削除したオブジェクト`hoge`を作成する
  // console.log('obj', obj);
  // const hoge = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
  // console.log('hoge', hoge);

  // TODO: オブジェクトからundefinedなプロパティを削除する
  const data = (() => {
    if (qiita && zenn) {
      return { qiita, zenn };
    } else if (qiita) {
      return { qiita };
    } else if (zenn) {
      return { zenn };
    } else {
      return {};
    }
  })();

  try {
    await prisma.user.update({
      where: { id: params.uid },
      data,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e });
  }
}
