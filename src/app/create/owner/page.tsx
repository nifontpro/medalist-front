import { Metadata } from 'next';
import CreateOwner from './_components/CreateOwner/CreateOwner';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание владельца`,
    description: 'Страница создания владельца',
  };
}

export default function CreateOwnerPage() {
  return <CreateOwner />;
}
