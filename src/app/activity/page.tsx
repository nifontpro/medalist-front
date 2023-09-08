// import SingleUser from './_components/SingleUser/SingleUser';
import { Metadata } from 'next';
import Activity from './_components/Activity/Activity';
import { useUserAdmin } from '@/api/user/useUserAdmin';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Активность`,
    description: 'Активность отдела и подотделов',
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
