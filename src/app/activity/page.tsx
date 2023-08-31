// import SingleUser from './_components/SingleUser/SingleUser';
import { Metadata } from 'next';
import Activity from './_components/Activity/Activity';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Activity | Medalist`,
  };
}

export default function ActivityPage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return (
    <main>
      <Activity deptId={params.id} />
    </main>
  );
}
