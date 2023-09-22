import { Metadata } from 'next';
import Activity from './_components/Activity';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    // title: `Награды отдела ${params.id}`,
  };
}

export default function DepartmentAwards({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Activity deptId={params.id} />
    </main>
  );
}
