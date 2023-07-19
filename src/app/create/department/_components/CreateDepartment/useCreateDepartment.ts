import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateDeptRequest } from '@/api/dept/request/createDeptRequest';
import { deptApi } from '@/api/dept/dept.api';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';

export const useCreateDepartment = (
  setValue: UseFormSetValue<CreateDeptRequest>,
  reset: UseFormReset<CreateDeptRequest>
) => {
  const searchParams = useSearchParams();

  const parentId = useMemo(
    () => Number(searchParams.get('id')),
    [searchParams]
  );

  const { back } = useRouter();
  const [create, createInfo] = deptApi.useGetProfilesMutation();
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  useEffect(() => {
    if (parentId && typeOfUser && typeOfUser.id) {
      setValue('parentId', parentId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, parentId, typeOfUser]);

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      back();
    },
    [back]
  );

  const onSubmit: SubmitHandler<CreateDeptRequest> = useCallback(
    async (data) => {
      let isError = false;
      if (parentId) {
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
            toastError(e, 'Ошибка создания отдела');
          });
      } else {
        isError = true;
        toast.error('Необходимо выбрать родительский отдел');
      }
      if (!isError) {
        reset();
        toast.success('Отдел успешно создан');
        back();
      }
    },
    [back, create, parentId, reset]
  );

  return {
    onSubmit,
    handleClick,
    back,
    createInfo,
  };
};
