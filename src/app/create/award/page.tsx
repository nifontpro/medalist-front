import { Metadata } from 'next';
import CreateAward from './_components/CreateAward/CreateAward';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Create Award | Medalist`,
  };
}

export default function CreateAwardPage() {
  return <CreateAward />;
}
