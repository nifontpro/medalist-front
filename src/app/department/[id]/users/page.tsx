'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import Users from './_components/Users/Users';
import { RootState } from '@/store/storage/store';
import { userApi } from '@/api/user/user.api';
import { useUserAdmin } from '@/app/user/useUserAdmin';

export const DepartmentUsers = ({ params }: { params: { id: string } }) => {
  const { usersOnDepartment } = useUserAdmin(params.id);

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
