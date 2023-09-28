import { Metadata } from 'next';
import Awards from './_components/Awards/Awards';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    // title: `Награды отдела ${params.id}`,
  };
}

export default function DepartmentAwards({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Awards id={params.id} />
    </main>
  );
}
