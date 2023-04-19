'use client';

import { deptApi } from '@/api/dept/dept.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import P from '@/ui/P/P';

export const SingleDepartment = ({ params }: { params: { id: string } }) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: department } = deptApi.useGetByIdQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(params.id),
    },
    {
      skip: !typeOfUser,
    }
  );

  return (
    <div>
      Department {params.id}
      <P size='xs' fontstyle='thin'>
        Название: {department?.data?.dept.name}
      </P>
      <P size='xs' fontstyle='thin'>
        Адрес: {department?.data?.address}
      </P>
      <P size='xs' fontstyle='thin'>
        Email: {department?.data?.email}
      </P>
      <P size='xs' fontstyle='thin'>
        Телефон: {department?.data?.phone}
      </P>
      <P size='xs' fontstyle='thin'>
        Описание: {department?.data?.description}
      </P>
    </div>
  );
};

export default SingleDepartment;
