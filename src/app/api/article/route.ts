import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const articles = await prisma.article.findMany();
  return NextResponse.json({ ok: true, articles });
}

export async function POST(req: NextRequest) {
  const { uid, articles } = (await req.json()) as {
    uid: string;
    articles: Prisma.ArticleCreateInput[];
  };

  try {
    await prisma.$transaction((tx) => {
      // 記事の削除と更新をトランザクションで行う
      return tx.article.deleteMany({ where: { creatorId: uid } }).then(() => {
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
