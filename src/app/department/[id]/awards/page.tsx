'use client';

import { useUserAdmin } from '@/app/user/useUserAdmin';
import NoAccess from '@/ui/NoAccess/NoAccess';
import Spinner from '@/ui/Spinner/Spinner';
import Awards from './_components/Awards/Awards';

export default function DepartmentAwards({
  params,
}: {
  params: { id: string };
}) {
  const { usersOnDepartment, isLoadingUsersOnDept } = useUserAdmin(params.id);
  if (isLoadingUsersOnDept) return <Spinner />;
  if (!usersOnDepartment?.success) return <NoAccess button={false} />;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <main>
        <Awards users={usersOnDepartment.data} id={params.id} />
      </main>
    );
  } else {
    return null;
  }
}
