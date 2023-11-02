import { Metadata } from 'next';
import Gifts from './_components/Gifts/Gifts';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Призы`,
  };
}

export default function GiftsPage(): JSX.Element {
  return (
    <main>
      <Gifts />
    </main>
  );
}
