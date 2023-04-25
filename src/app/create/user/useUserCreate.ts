import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/domain/model/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { CreateUserRequest } from '@/api/user/request/CreateUserRequest';

export const useUserCreate = (
  setValue: UseFormSetValue<CreateUserRequest>,
  active: Gender
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const searchParams = useSearchParams();
  const deptId = Number(searchParams.get('deptId'));
  // console.log(deptId)

  const { back } = useRouter();
  const [create] = userApi.useCreateUserMutation();

  useEffect(() => {
    if (active != undefined) {
      setValue('gender', active);
    }
    if (deptId && typeOfUser && typeOfUser.id) {
      setValue('deptId', deptId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, active, deptId, typeOfUser]);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  const onSubmit: SubmitHandler<CreateUserRequest> = async (data) => {
    let isError = false;

    if (active != undefined) {
      data.gender = active;
    }
    await create({ ...data })
      .unwrap()
      .then((res) => {
        if (res.success == false) {
          toastError(res.errors[0].message);
          isError = true;
        }
      })
      .catch((e) => {
        isError = true;
        toastError(e, 'Ошибка создания профиля сотрудника');
      });
    if (!isError) {
      toast.success('Профиль сотрудника успешно создан');
      back();
    }
  };

  return { onSubmit, handleClick };
};
