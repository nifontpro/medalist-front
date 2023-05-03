'use client';

import { useDepartmentAdmin } from '../useDepartmentAdmin';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import TitleSingleDepartment from './_components/TitleSingleDepartment/TitleSingleDepartment';

export default function SingleDepartment({
  params,
}: {
  params: { id: string };
}) {
  const { singleDepartment, isLoadingByIdDept } = useDepartmentAdmin(params.id);
  if (isLoadingByIdDept) return <Spinner />;
  if (!singleDepartment?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <main>
      {singleDepartment.data && (
        <TitleSingleDepartment department={singleDepartment.data} />
      )}
    </main>
  );
}
