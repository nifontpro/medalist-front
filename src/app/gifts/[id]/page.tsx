import { Metadata } from 'next';
import SingleGift from './_components/SingleAward/SingleGift';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Приз | Медалист`,
  };
}

export default function SingleGiftPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <SingleGift id={params.id} />
    </main>
  );
}
