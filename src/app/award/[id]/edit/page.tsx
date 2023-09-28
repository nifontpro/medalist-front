import { Metadata } from 'next';
import AwardEdit from './_components/AwardEdit/AwardEdit';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Редактирование награды | Медалист`,
  };
}

export default function AwardEditPage({ params }: { params: { id: string } }) {
  return <AwardEdit id={params.id} />;
}
