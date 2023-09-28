import { Metadata } from 'next';
import CreateAward from './_components/CreateAward/CreateAward';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание награды`,
    description: 'Создание награды или номинации',
  };
}

export default function CreateAwardPage() {
  return <CreateAward />;
}
