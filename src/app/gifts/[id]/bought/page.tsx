import { Metadata } from 'next';
import GiftBought from './_components/GiftEdit/GiftBought';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Медалист`,
  };
}

export default function GiftBoughtPage({ params }: { params: { id: string } }) {
  return <GiftBought id={params.id} />;
}
