import { Metadata } from 'next';
import GiftSettings from './_components/GiftSettings/GiftSettings';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Настройка магазина призов | Медалист`,
  };
}

export default function GiftSettingsPage() {
  return (
    <main>
      <GiftSettings />
    </main>
  );
}
