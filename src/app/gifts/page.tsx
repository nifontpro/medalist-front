import { Metadata } from 'next';
import Gifts from './_components/Gifts/Gifts';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Призы`,
  };
}

export default function GiftsPage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return (
    <main>
      <Gifts id={'83'} />
    </main>
  );
}
