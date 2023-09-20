import { Metadata } from 'next';
import UserEdit from './_components/UserEdit/UserEdit';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Medalist`,
  };
}

export default function UserEditPage({ params }: { params: { id: string } }) {
  return <UserEdit id={params.id} />;
}
