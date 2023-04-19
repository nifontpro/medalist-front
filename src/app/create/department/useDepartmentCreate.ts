import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateDeptRequest } from '@/api/dept/request/createDeptRequest';
import { deptApi } from '@/api/dept/dept.api';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';

export const useDepartmentCreate = (
  setValue: UseFormSetValue<CreateDeptRequest>
) => {
  const searchParams = useSearchParams();
  const parentId = Number(searchParams.get('id'));

  const { back } = useRouter();
  const [create] = deptApi.useGetProfilesMutation();
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  useEffect(() => {
    if (parentId && typeOfUser && typeOfUser.id) {
      setValue('parentId', parentId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, parentId, typeOfUser]);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  const onSubmit: SubmitHandler<CreateDeptRequest> = async (data) => {
    let isError = false;
    console.log(data);
    if (parentId) {
      await create({ ...data })
        .unwrap()
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания отдела');
          console.log('Ошибка');
        });
    } else {
      isError = true;
      toast.error('Необходимо выбрать родительский отдел');
      console.log('Ошибка');
    }
    if (!isError) {
      toast.success('Отдел успешно создан');
      console.log('Отдел успешно создан');
      back();
    }
  };

  return { onSubmit, handleClick, back };
};
