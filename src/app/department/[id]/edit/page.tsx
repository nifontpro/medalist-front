import { Metadata } from 'next';
import DepartmentEdit from './_components/DepartmentEdit/DepartmentEdit';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Department edit ${params.id} | Medalist`,
  };
}

export default function EditDepartment({ params }: { params: { id: string } }) {
  return <DepartmentEdit id={params.id} />;
}
