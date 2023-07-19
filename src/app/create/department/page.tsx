import { Metadata } from 'next';
import CreateDepartment from './_components/CreateDepartment/CreateDepartment';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Create Department | Medalist`,
  };
}

export default function CreateDepartmentPage() {
  return <CreateDepartment />;
}
