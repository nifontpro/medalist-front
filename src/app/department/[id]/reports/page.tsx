import Main from '@/app/_components/Main/Main';

export default function DepartmentReports({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Main deptId={params.id} />
    </main>
  );
}
