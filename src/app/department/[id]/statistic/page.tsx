export default function DepartmentStatistic({
  params,
}: {
  params: { id: string };
}) {
  return <div>Statistic department {params.id}</div>;
}
