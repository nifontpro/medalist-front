import { Metadata } from 'next';
import CreateGift from './_components/CreateGift/CreateGift';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Создание приза`,
    description: 'Страница создания приза',
  };
}

export default function CreateGiftPage() {
  return <CreateGift />;
}
