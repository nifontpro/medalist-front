'use client';

import P from '@/ui/P/P';
import { useDepartmentAdmin } from '../useDepartmentAdmin';

export const SingleDepartment = ({ params }: { params: { id: string } }) => {
  const { singleDepartment } = useDepartmentAdmin(params.id);

  return (
    <div>
      Department: {params.id}
      <P size='xs' fontstyle='thin'>
        Название: {singleDepartment?.data?.dept.name}
      </P>
      <P size='xs' fontstyle='thin'>
        Адрес: {singleDepartment?.data?.address}
      </P>
      <P size='xs' fontstyle='thin'>
        Email: {singleDepartment?.data?.email}
      </P>
      <P size='xs' fontstyle='thin'>
        Телефон: {singleDepartment?.data?.phone}
      </P>
      <P size='xs' fontstyle='thin'>
        Описание: {singleDepartment?.data?.description}
      </P>
    </div>
  );
};

export default SingleDepartment;
