import {
  SubmitHandler,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deptApi } from '@/api/dept/dept.api';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { UpdateDeptRequest } from '@/api/dept/request/updateDeptRequest';
import { RootState } from '@/store/storage/store';
import { ForWhat } from '@/ui/ImageDefault/ImageDefault';

export const useDepartmentEdit = (
  setValue: UseFormSetValue<UpdateDeptRequest>,
  id: string,
  getValues: UseFormGetValues<UpdateDeptRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: singleDepartment, isLoading: isLoadingByIdDept } =
    deptApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const forWhat: ForWhat =
    singleDepartment?.data?.dept.level == 2
      ? ('company' as ForWhat)
      : ('dept' as ForWhat);

  const { back, push } = useRouter();
  const [update] = deptApi.useUpdateMutation();

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
      setValue('deptId', Number(id));
    }
    if (singleDepartment) {
      setValue('name', singleDepartment.data?.dept.name);
      setValue('address', singleDepartment.data?.address);
      setValue('phone', singleDepartment.data?.phone);
      setValue('email', singleDepartment.data?.email);
      setValue('description', singleDepartment.data?.description);
      setValue('classname', singleDepartment.data?.dept.classname);
    }
  }, [id, setValue, singleDepartment, typeOfUser]);

  const handleBack = () => {
    if (singleDepartment) {
      const { name, phone, email, description } = getValues();
      if (
        name != singleDepartment.data?.dept.name ||
        phone != singleDepartment.data?.phone ||
        email != singleDepartment.data?.email ||
        description != singleDepartment.data?.description
      ) {
        setOpenModalConfirm(true);
      } else {
        back();
      }
    }
  };

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleBack();
  };

  const onSubmit: SubmitHandler<UpdateDeptRequest> = useCallback(
    async (data) => {
      let isError = false;

      await update({ ...data })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            errorMessageParse(res.errors);
            isError = true;
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка редактирования отдела');
        });

      if (!isError) {
        toast.success('Отдел успешно отредактирован');
        push(`/department/${id}`);
      }
    },
    [push, id, update]
  );

  return {
    onSubmit,
    handleClick,
    back,
    isLoadingByIdDept,
    singleDepartment,
    forWhat,
  };
};
