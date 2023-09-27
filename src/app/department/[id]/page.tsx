import { Metadata } from 'next';
import TitleSingleDepartment from './_components/TitleSingleDepartment/TitleSingleDepartment';
import EventDepartment from './_components/EventDepartment/EventDepartment';
import Main from '@/app/_components/Main/Main';

// async function getData(id: string) {
//   const response = fetch(`https://nmedalist.ru:8765/client/dept/get_id`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       authId: 78,
//       id,
//     }),
//   });
//   const data = await response;
//   return data;
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   return {
//     title: ``,
//   };
// }

export default async function SingleDepartment({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <Main deptId={params.id} />
    </main>
  );
}
