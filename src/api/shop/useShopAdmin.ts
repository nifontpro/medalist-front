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
import { payApi } from './pay/pay.api';
import { useRouter } from 'next/navigation';

export const useShopAdmin = (
  id?: string,
  baseRequest?: BaseRequest,
  awardId?: number,
  actionType?: ActionType
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { push } = useRouter();

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

  const [buy] = payApi.usePayProductMutation();
  const buyGift = useCallback(
    async (id: number) => {
      let isError = false;

      if (typeOfUser && typeOfUser.id)
        await buy({ authId: typeOfUser?.id, productId: id })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при покупке приза');
          });
      if (!isError) {
        toast.success('Приз успешно куплен');
        push(`/gifts/${id}/bought`);
      }
    },
    [buy, typeOfUser]
  );

  const [give] = payApi.useGiveProductFromAdminMutation();
  const giveGiftAdmin = useCallback(
    async (payDataId: number) => {
      let isError = false;

      if (typeOfUser && typeOfUser.id)
        await give({ authId: typeOfUser?.id, payDataId })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при получении приза');
          });
      if (!isError) {
        toast.success('Приз успешно получен');
      }
    },
    [give, typeOfUser]
  );

  const [returnUser] = payApi.useReturnProductUserMutation();
  const returnUserAsync = useCallback(
    async (payDataId: number) => {
      let isError = false;

      if (typeOfUser && typeOfUser.id)
        await returnUser({ authId: typeOfUser?.id, payDataId })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка возврата приза');
          });
      if (!isError) {
        toast.success('Приз успешно возвращен');
      }
    },
    [returnUser, typeOfUser]
  );

  const [returnAdmin] = payApi.useReturnProductAdminMutation();
  const returnAdminAsync = useCallback(
    async (payDataId: number) => {
      let isError = false;

      if (typeOfUser && typeOfUser.id)
        await returnAdmin({ authId: typeOfUser?.id, payDataId })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка возврата приза');
          });
      if (!isError) {
        toast.success('Приз успешно возвращен');
      }
    },
    [returnAdmin, typeOfUser]
  );

  const [giveAdmin] = payApi.useGiveProductFromAdminMutation();
  const giveAdminAsync = useCallback(
    async (payDataId: number) => {
      let isError = false;

      if (typeOfUser && typeOfUser.id)
        await giveAdmin({ authId: typeOfUser?.id, payDataId })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка выдачи приза');
          });
      if (!isError) {
        toast.success('Приз успешно выдан');
      }
    },
    [giveAdmin, typeOfUser]
  );

  return {
    deleteGiftAsync,
    buyGift,
    giveGiftAdmin,
    returnUserAsync,
    returnAdminAsync,
    giveAdminAsync,
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
