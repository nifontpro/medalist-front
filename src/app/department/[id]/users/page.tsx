'use client';

import { userData } from '@/app/user/_api/user.data';
import Users from './_components/Users/Users';

export const DepartmentUsers = ({ params }: { params: { id: string } }) => {
  const users = userData.filter((user) => user.deptId === Number(params.id));

  return (
    <div>
      <Users users={users} id={params.id} />
    </div>
  );
};

export default DepartmentUsers;
