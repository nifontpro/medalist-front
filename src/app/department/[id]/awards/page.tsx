import Awards from './_components/Awards/Awards';

export default function DepartmentAwards({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Awards id={params.id} />
    </main>
  );
}
