import Statistic from './_components/Statistic/Statistic';

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
