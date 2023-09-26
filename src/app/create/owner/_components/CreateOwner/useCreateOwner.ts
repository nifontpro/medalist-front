import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { CreateOwnerRequest } from '@/api/user/request/CreateOwnerRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';

export const useCreateOwner = (
  setValue: UseFormSetValue<CreateOwnerRequest>,
  active: Gender,
  reset: UseFormReset<CreateOwnerRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>
) => {
  const { back, push } = useRouter();
  const [create, createInfo] = userApi.useCreateOwnerMutation();

  useEffect(() => {
    if (active != undefined) {
      setValue('gender', active);
    }
  }, [setValue, active]);

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setOpenModalConfirm(true);
    },
    [setOpenModalConfirm]
  );

  const onSubmit: SubmitHandler<CreateOwnerRequest> = useCallback(
    async (data) => {
      let newDeptId: string | undefined = '';
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
          } else {
            newDeptId = res.data?.deptId.toString();
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания профиля владельца');
        });
      if (!isError) {
        reset();
        toast.success('Профиль владельца успешно создан');
        // back();
        localStorage.setItem('selectCompany', newDeptId);
        push(`/department/${newDeptId}/edit`);
      }
    },
    [active, back, push, create, reset]
  );

  return { onSubmit, handleClick, createInfo, back };
};
