import { Metadata } from 'next';
import CreateGift from './_components/CreateUser/CreateGift';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание приза`,
    description: 'Страница создания приза',
  };
}

export default function CreateGiftPage() {
  return <CreateGift />;
}
