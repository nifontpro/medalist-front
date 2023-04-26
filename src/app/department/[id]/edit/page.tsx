import DepartmentEdit from './_components/DepartmentEdit/DepartmentEdit';

export default function EditDepartment({ params }: { params: { id: string } }) {
  return <DepartmentEdit id={params.id} />;
}
