import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useUserAdmin = (id?: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: singleUser, isLoading: isLoadingSingleUser } =
    userApi.useGetByIdQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        userId: id ? Number(id) : 0,
      },
      {
        skip: !typeOfUser && !id,
      }
    );

  const { data: usersOnDepartment, isLoading: isLoadingUsersOnDept } =
    userApi.useGetUsersByDeptQuery(
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
    let isError = false;

    const deleteUserAsync = async (id: number, authId: number) => {
      await deleteUser({ authId, userId: id })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            isError = true;
            errorMessageParse(res.errors);
          } else {
            toast.success('Профиль сотрудника успешно удален');
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка при удалении профиля сотрудника');
        });
      if (!isError) {
        toast.success('Профиль успешно удален');
      }
    };

    return {
      deleteUserAsync,
      singleUser,
      isLoadingSingleUser,
      usersOnDepartment,
      isLoadingUsersOnDept,
    };
  }, [
    deleteUser,
    singleUser,
    usersOnDepartment,
    isLoadingSingleUser,
    isLoadingUsersOnDept,
  ]);
};
