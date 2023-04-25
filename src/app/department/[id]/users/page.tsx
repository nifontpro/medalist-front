'use client';

import Users from './_components/Users/Users';
import { useUserAdmin } from '@/app/user/useUserAdmin';
import NoAccess from '@/ui/NoAccess/NoAccess';
import Spinner from '@/ui/Spinner/Spinner';

export default function DepartmentUsers({
  params,
}: {
  params: { id: string };
}) {
  const { usersOnDepartment, isLoadingUsersOnDept } = useUserAdmin(params.id);
  if (isLoadingUsersOnDept) return <Spinner />;
  if (!usersOnDepartment?.success) return <NoAccess button={false} />;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <div>
        <Users users={usersOnDepartment.data} id={params.id} />
      </div>
    );
  } else {
    return null;
  }
}
