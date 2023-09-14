import Main from '@/app/_components/Main/Main';
import { Metadata } from 'next';
import TitleSingleDepartment from '../_components/TitleSingleDepartment/TitleSingleDepartment';
import EventDepartment from '../_components/EventDepartment/EventDepartment';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Дошборд отдела ${params.id}`,
  };
}

export default function DepartmentReports({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <TitleSingleDepartment id={params.id} />
      <EventDepartment id={params.id} />
    </main>
    // <main>
    //   <Main deptId={params.id} />
    // </main>
  );
}
