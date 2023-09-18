import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { CreateUserRequest } from '@/api/user/request/CreateUserRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';

export const useCreateUser = (
  setValue: UseFormSetValue<CreateUserRequest>,
  active: Gender,
  reset: UseFormReset<CreateUserRequest>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const searchParams = useSearchParams();

  const { back } = useRouter();

  const [create, createInfo] = userApi.useCreateUserMutation();

  const deptId = useMemo(
    () => Number(searchParams.get('deptId')),
    [searchParams]
  );

  useEffect(() => {
    if (active != undefined) {
      setValue('gender', active);
    }
    if (deptId && typeOfUser && typeOfUser.id) {
      setValue('deptId', deptId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, active, deptId, typeOfUser]);

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log(event.type);

      back();
    },
    []
  );

  const onSubmit: SubmitHandler<CreateUserRequest> = useCallback(
    async (data) => {
      let isError = false;

      if (active != undefined) {
        data.gender = active;
      }
      await create({ ...data })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            errorMessageParse(res.errors);
            isError = true;
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания профиля сотрудника');
        });
      if (!isError) {
        reset();
        toast.success('Профиль сотрудника успешно создан');
        back();
      }
    },
    [active, back, create, reset]
  );

  return { onSubmit, handleClick, createInfo, back };
};
