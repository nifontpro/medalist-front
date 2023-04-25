import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/domain/model/user/user';
import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';

export const useCreateOwner = (
  setValue: UseFormSetValue<CreateOwnerRequest>,
  active: Gender
) => {
  const { back } = useRouter();
  const [create] = userApi.useCreateOwnerMutation();

  useEffect(() => {
    if (active != undefined) {
      setValue('gender', active);
    }
  }, [setValue, active]);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  const onSubmit: SubmitHandler<CreateOwnerRequest> = async (data) => {
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
        toastError(e, 'Ошибка создания профиля владельца');
      });
    if (!isError) {
      toast.success('Профиль владельца успешно создан');
      back();
    }
  };

  return { onSubmit, handleClick };
};
