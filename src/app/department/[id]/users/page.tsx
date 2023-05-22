import Users from './_components/Users/Users';

export default function DepartmentUsers({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Users id={params.id} />
    </main>
  );
}
