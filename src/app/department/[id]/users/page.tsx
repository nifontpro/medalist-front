'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import Users from './_components/Users/Users';
import { RootState } from '@/store/storage/store';
import { userApi } from '@/api/user/user.api';

export const DepartmentUsers = ({ params }: { params: { id: string } }) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: users } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(params.id),
    },
    {
      skip: !typeOfUser,
    }
  );

  if (users && users.data) {
    return (
      <div>
        <Users users={users.data} id={params.id} />
      </div>
    );
  } else {
    return null;
  }
};

export default DepartmentUsers;
