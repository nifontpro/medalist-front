'use client';

import P from '@/ui/P/P';
import { useUserAdmin } from '../useUserAdmin';

export const SingleUser = ({ params }: { params: { id: string } }) => {
  const { singleUser } = useUserAdmin(params.id);
  console.log(singleUser?.data);

  return (
    <div>
      Пользватель {params.id}
      <P size='xs' fontstyle='thin'>
        Фамилия: {singleUser?.data?.user.firstname}
      </P>
      <P size='xs' fontstyle='thin'>
        Имя: {singleUser?.data?.user.lastname}
      </P>
      <P size='xs' fontstyle='thin'>
        Отчество: {singleUser?.data?.user.patronymic}
      </P>
      <P size='xs' fontstyle='thin'>
        Телефон: {singleUser?.data?.phone}
      </P>
      <P size='xs' fontstyle='thin'>
        Описание: {singleUser?.data?.description}
      </P>
    </div>
  );
};

export default SingleUser;
