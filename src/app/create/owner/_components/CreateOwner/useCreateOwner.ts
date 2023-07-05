import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';

export const useCreateOwner = (
  setValue: UseFormSetValue<CreateOwnerRequest>,
  active: Gender,
  reset: UseFormReset<CreateOwnerRequest>
) => {
  const { back } = useRouter();
  const [create, createInfo] = userApi.useCreateOwnerMutation();

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
          errorMessageParse(res.errors);
          isError = true;
        }
      })
      .catch((e) => {
        isError = true;
        toastError(e, 'Ошибка создания профиля владельца');
      });
    if (!isError) {
      reset()
      toast.success('Профиль владельца успешно создан');
      back();
    }
  };

  return { onSubmit, handleClick, createInfo };
};
