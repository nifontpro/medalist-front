'use client';

import P from '@/ui/P/P';
import { useDepartmentAdmin } from '../useDepartmentAdmin';
import Spinner from '@/ui/Spinner/Spinner';

export const SingleDepartment = ({ params }: { params: { id: string } }) => {
  const { singleDepartment, isLoadingByIdDept } = useDepartmentAdmin(params.id);
  if (isLoadingByIdDept) return <Spinner />;
  if (!singleDepartment?.success) {
    return <div>Произошла ошибка запроса - обновите, пожалуйста, страницу</div>;
  }

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
