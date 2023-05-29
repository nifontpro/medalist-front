import { Metadata } from 'next';
import TitleSingleDepartment from './_components/TitleSingleDepartment/TitleSingleDepartment';

async function getData(id: string) {
  const response = await fetch(`https://nmedalist.ru:8765/client/dept/get_id`, {
    next: {
      revalidate: 60,
    },
  });
  return response.json;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // const data = getData(params.id)
  return {
    title: `Department ${params.id} | Medalist`,
    // title: `Department ${data.deptName} | Medalist`,
  };
}

export default async function SingleDepartment({
  params,
}: {
  params: { id: string };
}) {
  // const data = getData(params.id)
  // console.log(data)

  return (
    <main>
      <TitleSingleDepartment id={params.id} />
    </main>
  );
}
