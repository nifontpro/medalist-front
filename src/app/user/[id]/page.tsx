import SingleUser from './_components/SingleUser/SingleUser';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Medalist`,
  };
}

export default function SingleUserPage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return (
    <main>
      <SingleUser id={params.id} />
    </main>
  );
}
