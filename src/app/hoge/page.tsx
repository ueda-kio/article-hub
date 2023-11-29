import Link from 'next/link';
import List from '../List';
import Test from './Test';

function Hoge() {
  return (
    <>
      <p>hoge</p>
      <br />
      <div>
        <Test />
      </div>
      <Link href={'/'}>top</Link>
      {/* @ts-expect-error Server Component */}
      <List />
    </>
  );
}

export default Hoge;
