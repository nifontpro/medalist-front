import SingleAward from './_components/SingleAward/SingleAward';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Награда ${params.id}`,
  };
}

export default function SingleAwardPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <SingleAward id={params.id} />
    </main>
  );
}
