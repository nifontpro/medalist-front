import { Metadata } from 'next';
import CreateUser from './_components/CreateUser/CreateUser';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Create User | Medalist`,
  };
}

export default function CreateUserPage() {
  return <CreateUser />;
}
