import { deptApi } from '@/api/dept/dept.api';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useDepartmentAdmin = () => {
  const [deleteDepartment] = deptApi.useDeleteMutation();

  return useMemo(() => {
    const deleteAsync = async (id: number, authId: number) => {
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
      deleteAsync,
    };
  }, [deleteDepartment]);
};
