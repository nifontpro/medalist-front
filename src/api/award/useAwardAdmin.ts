import { awardApi } from '@/api/award/award.api';
import { ActionType } from '@/types/award/Activity';
import { AwardState, AwardType } from '@/types/award/Award';
import { BaseRequest } from '@/types/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useAwardAdmin = (
  awardId?: string,
  baseRequest?: BaseRequest,
  active?: AwardState,
  actionType?: ActionType,
  awardType?: AwardType,
  withUsers?: boolean
) => {
  const { back } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // // Получить награду по id
  // const { data: singleAward, isLoading: isLoadingSingleAward } =
  //   awardApi.useGetByIdQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       awardId: Number(awardId),
  //     },
  //     {
  //       skip: !typeOfUser && !awardId,
  //     }
  //   );

  // // Получить Актив награды по id награды
  // const {
  //   data: singleActivAward,
  //   isLoading: isLoadingSingleActivAward,
  //   isFetching: isFetchingSingleActivAward,
  // } = awardApi.useGetUsersByActivAwardQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     awardId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //     actionType: actionType ? actionType : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получить Актив награды по id пользователя
  // const {
  //   data: singleActivAwardUser,
  //   isLoading: isLoadingSingleActivAwardUser,
  // } = awardApi.useGetActivAwardByUserQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     userId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //     awardType: awardType ? awardType : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получить награды в отделе
  // const {
  //   data: awardsOnDepartment,
  //   isLoading: isLoadingAwardsOnDept,
  //   isFetching: isFetchingUsersOnDepartment,
  // } = awardApi.useGetByDeptQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     deptId: Number(awardId),
  //     withUsers: withUsers !== undefined ? withUsers : false,
  //     state: active ? active : undefined,
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получить колличество наград в отделе
  // const { data: colAwardsOnDepartment, isLoading: isLoadingColAwardsOnDept } =
  //   awardApi.useGetAwardCountQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       deptId: Number(awardId),
  //       baseRequest: baseRequest ? baseRequest : undefined,
  //     },
  //     {
  //       skip: !typeOfUser,
  //     }
  //   );

  // // Получить Актив наград по id в отделе
  // const {
  //   data: awardsActivOnDepartment,
  //   isLoading: isLoadingAwardsActivOnDept,
  //   isFetching: isFetchingUsersActivOnDepartment,
  // } = awardApi.useGetActivAwardByDeptQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     deptId: Number(awardId),
  //     awardState: active,
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получение количества активных награждений (наград у пользователей) разных типов в компании
  // const {
  //   data: colAwardsActivOnDepartment,
  //   isLoading: isLoadingColAwardsActivOnDepartment,
  // } = awardApi.useGetActivCountQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     deptId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // С КОРНЕВОГО ОТДЕЛА ! Получение количества активных награждений (наград у пользователей) разных типов в компании
  // const { data: colAwardsActivRoot, isLoading: isLoadingColAwardsActivRoot } =
  //   awardApi.useGetActivCountRootQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       deptId: Number(awardId),
  //       baseRequest: baseRequest ? baseRequest : undefined,
  //     },
  //     {
  //       skip: !typeOfUser && !awardId,
  //     }
  //   );

  // // Получение наград доступных для награждения сотрудников текущим админом
  // const {
  //   data: awardsAvailableForRewardUser,
  //   isLoading: isLoadingAwardsAvailableForRewardUser,
  // } = awardApi.useGetAvailableBySubDeptsQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     deptId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получение наград типа SIMPLE доступных для награждения сотрудников текущим админом
  // const {
  //   data: awardsAvailableForRewardUserSimple,
  //   isLoading: isLoadingAwardsAvailableForRewardUserSimple,
  // } = awardApi.useGetAvailableAwardsForRewardBySubDeptsQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     userId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  // // Получение количества сотрудников с наградами и без них в отделе(ах)
  // const {
  //   data: userAwardWWCountOnDept,
  //   isLoading: isLoadingUserAwardWWCountOnDept,
  // } = awardApi.useGetUserAwardWWCountOnDeptQuery(
  //   {
  //     authId: typeOfUser?.id!,
  //     deptId: Number(awardId),
  //     baseRequest: baseRequest ? baseRequest : undefined,
  //   },
  //   {
  //     skip: !typeOfUser && !awardId,
  //   }
  // );

  const [deleteAward] = awardApi.useDeleteMutation();
  const [deleteUserReward, deleteUserRewardInfo] =
    awardApi.useSendActionMutation();

  const deleteAwardAsync = useCallback(
    async (awardId: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        await deleteAward({ authId: typeOfUser.id, awardId: awardId })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при удалении награды');
          });
      if (!isError) {
        back();
        toast.success('Награда успешно удалена');
      }
    },
    [back, deleteAward, typeOfUser]
  );

  const userRewardAsync = useCallback(
    async (awardId: number, actionType: ActionType, userId: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        await deleteUserReward({
          authId: typeOfUser.id,
          awardId: awardId,
          userId: userId,
          actionType: actionType,
        })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }
          })
          .catch(() => {
            isError = true;
            toast.error('Ошибка награждения');
          });

      if (!isError) {
        toast.success('Награждение успешно');
      }
    },
    [deleteUserReward, typeOfUser]
  );

  return {
    deleteAwardAsync,
    userRewardAsync,
    deleteUserRewardInfo,
    // singleAward,
    // isLoadingSingleAward,
    // awardsOnDepartment,
    // isFetchingUsersOnDepartment,
    // isLoadingAwardsOnDept,
    // singleActivAward,
    // isLoadingSingleActivAward,
    // isFetchingSingleActivAward,
    // awardsActivOnDepartment,
    // isLoadingAwardsActivOnDept,
    // singleActivAwardUser,
    // isLoadingSingleActivAwardUser,
    // awardsAvailableForRewardUser,
    // isLoadingAwardsAvailableForRewardUser,
    // colAwardsOnDepartment,
    // isLoadingColAwardsOnDept,
    // colAwardsActivOnDepartment,
    // isLoadingColAwardsActivOnDepartment,
    // isFetchingUsersActivOnDepartment,
    // colAwardsActivRoot,
    // isLoadingColAwardsActivRoot,
    // userAwardWWCountOnDept,
    // isLoadingUserAwardWWCountOnDept,
    // awardsAvailableForRewardUserSimple,
    // isLoadingAwardsAvailableForRewardUserSimple,
  };
};
