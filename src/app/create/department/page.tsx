import { Metadata } from 'next';
import CreateDepartment from './_components/CreateDepartment/CreateDepartment';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание отдела`,
    description: 'Создание отдела, подразделения',
  };
}

export default function CreateDepartmentPage() {
  return <CreateDepartment />;
}
