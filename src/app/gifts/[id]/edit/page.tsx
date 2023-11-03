import { Metadata } from 'next';
import GiftEdit from './_components/UserEdit/GiftEdit';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Медалист`,
  };
}

export default function GiftEditPage({ params }: { params: { id: string } }) {
  return <GiftEdit id={params.id} />;
}
