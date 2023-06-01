import { deptApi } from '@/api/dept/dept.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useDepartmentAdmin = (id?: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: singleDepartment, isLoading: isLoadingByIdDept } =
    deptApi.useGetByIdQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: id ? Number(id) : 0,
      },
      {
        skip: !typeOfUser,
      }
    );

  const [deleteDepartment] = deptApi.useDeleteMutation();

  return useMemo(() => {
    const deleteDepartmentAsync = async (id: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        await deleteDepartment({ authId: typeOfUser.id, deptId: id })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при удалении отдела');
          });
      if (!isError) {
        toast.success('Отдел успешно удален');
      }
    };

    return {
      deleteDepartmentAsync,
      singleDepartment,
      isLoadingByIdDept,
    };
  }, [deleteDepartment, singleDepartment, isLoadingByIdDept, typeOfUser]);
};
