import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/types/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ActionType } from '@/types/award/Activity';
import { productApi } from './product/product.api';

export const useShopAdmin = (
  id?: string,
  baseRequest?: BaseRequest,
  awardId?: number,
  actionType?: ActionType
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [deleteGift] = productApi.useDeleteMutation();

  const deleteGiftAsync = useCallback(
    async (id: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        await deleteGift({ authId: typeOfUser?.id, productId: id })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при удалении приза');
          });
      if (!isError) {
        toast.success('Приз успешно удален');
      }
    },
    [deleteGift, typeOfUser]
  );

  return {
    deleteGiftAsync,
    // singleUser,
    // isLoadingSingleUser,
    // usersOnDepartment,
    // isLoadingUsersOnDepartment,
    // usersOnSubDepartment,
    // isLoadingUsersOnSubDept,
    // usersGenderOnDepartment,
    // isLoadingUsersGenderOnDepartment,
    // usersOnDepartmentWithAwards,
    // isLoadingUsersOnDepartmentWithAwards,
    // userSettings,
    // isLoadingUserSettings,
    // saveUserSettings,
    // isLoadingSaveUserSettings,
    // isFetchingUsersOnDepartment,
    // availableUsersBySubDeptForAwards,
    // isLoadingAvailableUsersBySubDeptForAwards,
  };
};
