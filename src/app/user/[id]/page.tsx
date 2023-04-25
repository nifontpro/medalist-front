'use client';

import P from '@/ui/P/P';
import { useUserAdmin } from '../useUserAdmin';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';

export default function SingleUser({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const { singleUser, isLoadingSingleUser } = useUserAdmin(params.id);
  if (isLoadingSingleUser) return <Spinner />;
  if (!singleUser?.success) return <NoAccess />;

  return (
    <>
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <div className='mt-10'>
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
    </>
  );
}
