'use client';

import NoAccess from '@/ui/NoAccess/NoAccess';
import Spinner from '@/ui/Spinner/Spinner';
import Awards from './_components/Awards/Awards';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';

export default function DepartmentAwards({
  params,
}: {
  params: { id: string };
}) {
  const { awardsOnDepartment, isLoadingAwardsOnDept } = useAwardAdmin(
    params.id
  );

  if (isLoadingAwardsOnDept) return <Spinner />;
  if (!awardsOnDepartment?.success) return <NoAccess button={false} />;

  if (awardsOnDepartment && awardsOnDepartment.data) {
    return (
      <main>
        <Awards awards={awardsOnDepartment.data} id={params.id} />
      </main>
    );
  } else {
    return null;
  }
}
