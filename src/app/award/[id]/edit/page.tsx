import AwardEdit from './_components/AwardEdit/AwardEdit';

export default function AwardEditPage({ params }: { params: { id: string } }) {
  return <AwardEdit id={params.id} />;
}
