import { Metadata } from 'next';
import Users from './_components/Users/Users';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    // title: `Сотрудники отдела ${params.id}`,
  };
}

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
