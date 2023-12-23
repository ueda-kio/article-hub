import ArticlesList from './ArticlesList';
import MembersList from './MembersList';

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ArticlesList />
      {/* @ts-expect-error Server Component */}
      <MembersList />
    </>
  );
}
