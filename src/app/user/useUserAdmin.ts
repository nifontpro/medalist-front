import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/domain/model/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useUserAdmin = (id?: string, baseRequest?: BaseRequest) => {

  const baseRequestDefault: BaseRequest = {
    page: 0,
    pageSize: 100
  }

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  //
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
        baseRequest: baseRequest ? baseRequest : baseRequestDefault,
      },
      {
        skip: !typeOfUser,
      }
    );

  const { data: usersOnSubDepartment, isLoading: isLoadingUsersOnSubDept } =
    userApi.useGetUsersBySubDeptQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: Number(id),
        baseRequest: baseRequest ? baseRequest : baseRequestDefault,
      },
      {
        skip: !typeOfUser
      }
    );

  const [deleteUser] = userApi.useDeleteMutation();

  return useMemo(() => {
    let isError = false;

    const deleteUserAsync = async (id: number) => {
      if (typeOfUser && typeOfUser.id)
        await deleteUser({ authId: typeOfUser?.id, userId: id })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при удалении профиля сотрудника');
          });
      if (!isError) {
        toast.success('Профиль сотрудника успешно удален');
      }
    };

    return {
      deleteUserAsync,
      singleUser,
      isLoadingSingleUser,
      usersOnDepartment,
      isLoadingUsersOnDept,
      usersOnSubDepartment,
      isLoadingUsersOnSubDept,
    };
  }, [
    deleteUser,
    singleUser,
    usersOnDepartment,
    isLoadingSingleUser,
    isLoadingUsersOnDept,
    usersOnSubDepartment,
    isLoadingUsersOnSubDept,
    typeOfUser,
  ]);
};
