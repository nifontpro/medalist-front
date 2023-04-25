import { deptApi } from '@/api/dept/dept.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
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
    const deleteDepartmentAsync = async (id: number, authId: number) => {
      await deleteDepartment({ authId, deptId: id })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            toastError(res.errors[0].message);
          } else {
            toast.success('Отдел успешно удален');
          }
        })
        .catch((e) => {
          toastError(e, 'Ошибка при удалении профиля сотрудника');
        });
    };

    return {
      deleteDepartmentAsync,
      singleDepartment,
      isLoadingByIdDept,
    };
  }, [deleteDepartment, singleDepartment, isLoadingByIdDept]);
};
