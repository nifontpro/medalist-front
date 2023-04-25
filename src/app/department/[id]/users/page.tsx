'use client';

import Users from './_components/Users/Users';
import { useUserAdmin } from '@/app/user/useUserAdmin';
import Spinner from '@/ui/Spinner/Spinner';

export const DepartmentUsers = ({ params }: { params: { id: string } }) => {
  const { usersOnDepartment, isLoadingUsersOnDept } = useUserAdmin(params.id);
  if (isLoadingUsersOnDept) return <Spinner />;
  if (!usersOnDepartment?.success)
    return <div>Произошла ошибка запроса - обновите, пожалуйста, страницу</div>;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <div>
        <Users users={usersOnDepartment.data} id={params.id} />
      </div>
    );
  } else {
    return null;
  }
};

export default DepartmentUsers;
