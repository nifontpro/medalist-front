import { userApi } from '@/api/user/user.api';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useUserAdmin = () => {
  const [deleteUser] = userApi.useDeleteMutation();

  return useMemo(() => {
    const deleteAsync = async (id: number, authId: number) => {
      await deleteUser({ authId, userId: id })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            toastError(res.errors[0].message);
          } else {
            toast.success('Профиль сотрудника успешно удален');
          }
        })
        .catch((e) => {
          toastError(e, 'Ошибка при удалении профиля сотрудника');
        });
    };

    return {
      deleteAsync,
    };
  }, [deleteUser]);
};
