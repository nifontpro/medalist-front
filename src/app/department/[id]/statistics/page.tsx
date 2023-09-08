import { Metadata } from 'next';
import Statistic from './_components/Statistic/Statistic';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Статистика отдела ${params.id}`,
  };
}

export default function DepartmentStatistics({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Statistic departId={params.id} />
    </main>
  );
}
