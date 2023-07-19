import { Metadata } from 'next';
import CreateOwner from './_components/CreateOwner/CreateOwner';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Create Owner | Medalist`,
  };
}

export default function CreateOwnerPage() {
  return <CreateOwner />;
}
