import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useUserAdmin = (id?: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: singleUser } = userApi.useGetByIdQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      userId: id ? Number(id) : 0,
    },
    {
      skip: !typeOfUser && !id,
    }
  );

  const { data: usersOnDepartment } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(id),
    },
    {
      skip: !typeOfUser,
    }
  );

  const [deleteUser] = userApi.useDeleteMutation();

  return useMemo(() => {
    const deleteUserAsync = async (id: number, authId: number) => {
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
      deleteUserAsync,
      singleUser,
      usersOnDepartment,
    };
  }, [deleteUser, singleUser, usersOnDepartment]);
};
