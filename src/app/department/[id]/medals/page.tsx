export default function DepartmentMedals({
  params,
}: {
  params: { id: string };
}) {
  return <div>Medals department {params.id}</div>;
}
