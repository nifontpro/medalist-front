import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/types/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ActionType } from '@/types/award/Activity';

export const useUserAdmin = (
  id?: string,
  baseRequest?: BaseRequest,
  awardId?: number,
  actionType?: ActionType
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить пользоветля по id
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

  // Получить настройки пользователя
  const { data: userSettings, isLoading: isLoadingUserSettings } =
    userApi.useGetSettingsQuery(
      {
        userId: 78,
      },
      {
        skip: !typeOfUser && !id,
      }
    );

  // Сохранить настройки пользователя
  const { data: saveUserSettings, isLoading: isLoadingSaveUserSettings } =
    userApi.useGetSettingsQuery(
      {
        userId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      },
      {
        skip: !typeOfUser && !id,
      }
    );

  // Получить пользоветлей в отделе
  const {
    data: usersOnDepartment,
    isLoading: isLoadingUsersOnDepartment,
    isFetching: isFetchingUsersOnDepartment,
  } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(id),
      baseRequest: baseRequest ? baseRequest : undefined,
    },
    {
      skip: !typeOfUser,
    }
  );

  // // Получить сотрудников отдела/подотделов с наградами (через активность типа AWARD)
  // const {
  //   data: usersOnDepartmentWithAwards,
  //   isLoading: isLoadingUsersOnDepartmentWithAwards,
  // } = userApi.useGetUsersWithAwardsQuery(
  //   {
  //     authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
  //     deptId: Number(id),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser,
  //   }
  // );

  // Получить сотрудников отдела/подотделов с наградами (через активность типа AWARD)
  const {
    data: usersOnDepartmentWithAwards,
    isLoading: isLoadingUsersOnDepartmentWithAwards,
  } = userApi.useGetUsersWithAwardCountQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(id),
      baseRequest: baseRequest ? baseRequest : undefined,
    },
    {
      skip: !typeOfUser,
    }
  );

  // // Получение сотрудников всех подотделов вместе с текущим
  // const { data: usersOnSubDepartment, isLoading: isLoadingUsersOnSubDept } =
  //   userApi.useGetUsersBySubDeptQuery(
  //     {
  //       authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
  //       deptId: Number(id),
  //       baseRequest: baseRequest ? baseRequest : undefined,
  //     },
  //     {
  //       skip: !typeOfUser,
  //     }
  //   );

  // // Получить количество сотрудников по полам
  // const {
  //   data: usersGenderOnDepartment,
  //   isLoading: isLoadingUsersGenderOnDepartment,
  // } = userApi.useGetUsersBySubDeptQuery(
  //   {
  //     authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
  //     deptId: Number(id),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser,
  //   }
  // );

  // Получить сотрудников которых можно наградить выбранной медалью
  const {
    data: availableUsersBySubDeptForAwards,
    isLoading: isLoadingAvailableUsersBySubDeptForAwards,
  } = userApi.useGetAvailableUsersBySubDeptForAwardsQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(id),
      awardId: awardId ? awardId : 0,
      actionType: actionType ? actionType : undefined,
      baseRequest: baseRequest ? baseRequest : undefined,
    },
    {
      skip: !typeOfUser || !awardId,
    }
  );

  const [deleteUser] = userApi.useDeleteMutation();

  const deleteUserAsync = useCallback(
    async (id: number) => {
      let isError = false;
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
    },
    [deleteUser, typeOfUser]
  );

  return {
    deleteUserAsync,
    singleUser,
    isLoadingSingleUser,
    usersOnDepartment,
    isLoadingUsersOnDepartment,
    // usersOnSubDepartment,
    // isLoadingUsersOnSubDept,
    // usersGenderOnDepartment,
    // isLoadingUsersGenderOnDepartment,
    usersOnDepartmentWithAwards,
    isLoadingUsersOnDepartmentWithAwards,
    userSettings,
    isLoadingUserSettings,
    saveUserSettings,
    isLoadingSaveUserSettings,
    isFetchingUsersOnDepartment,
    availableUsersBySubDeptForAwards,
    isLoadingAvailableUsersBySubDeptForAwards,
  };
};
