export default function DepartmentStatistics({
  params,
}: {
  params: { id: string };
}) {
  return <div>Statistics department {params.id}</div>;
}
