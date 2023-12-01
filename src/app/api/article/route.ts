import { prisma } from '@/lib/prismaClient';
import { Prisma, PrismaClient, type Site } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // リクエストのパラメータにuidが含まれている場合、そのユーザーの記事を返す
    // リクエストのパラメータにuidが含まれていない場合、全ての記事を返す
    const uid = req.nextUrl.searchParams.get('uid');
    if (uid) {
      const articles = await prisma.article.findMany({
        where: { creatorId: uid },
      });
      return NextResponse.json({ ok: true, articles });
    }

    const articles = await prisma.article.findMany();
    return NextResponse.json({ ok: true, articles });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, e });
  }
}

export async function POST(req: NextRequest) {
  const { uid, site, articles } = (await req.json()) as {
    uid: string;
    site: Site;
    articles: Prisma.ArticleCreateInput[];
  };

  try {
    await prisma.$transaction((tx) => {
      // 記事の削除と更新をトランザクションで行う
      return tx.article.deleteMany({ where: { site, creatorId: uid } }).then(() => {
        return Promise.all(
          articles.map((article) => {
            return tx.article.create({
              data: {
                site: article.site,
                title: article.title,
                url: article.url,
                likes_count: article.likes_count,
                publish: article.publish,
                created_at: article.created_at,
                creatorId: uid,
              },
            });
          }),
        );
      });
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, e });
  }
}
