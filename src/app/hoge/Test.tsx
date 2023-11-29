import seed from '@/seed';
async function action(params: FormData) {
  'use server';
  seed();
}

export default function Test() {
  return (
    <form action={action as any}>
      <button type="submit">Click Me!</button>
    </form>
  );
}
