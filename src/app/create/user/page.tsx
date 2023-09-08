import { Metadata } from 'next';
import CreateUser from './_components/CreateUser/CreateUser';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание сотрудника`,
    description: 'Страница создания сотрудника',
  };
}

export default function CreateUserPage() {
  return <CreateUser />;
}
