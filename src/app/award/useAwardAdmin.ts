import { awardApi } from '@/api/award/award.api';
import { ActionType } from '@/domain/model/award/Activity';
import { AwardState } from '@/domain/model/award/Award';
import { BaseRequest } from '@/domain/model/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useAwardAdmin = (awardId?: string, baseRequest?: BaseRequest, active?: AwardState) => {
  const { back } = useRouter();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награду по id
  const { data: singleAward, isLoading: isLoadingSingleAward } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        awardId: awardId ? Number(awardId) : 0,
      },
      {
        skip: !typeOfUser && !awardId,
      }
    );

  // Получить Актив награды по id награды
  const { data: singleActivAward, isLoading: isLoadingSingleActivAward } =
    awardApi.useGetUsersByActivAwardQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        awardId: awardId ? Number(awardId) : 0,
        baseRequest: undefined,
      },
      {
        skip: !typeOfUser && !awardId,
      }
    );

  // Получить Актив награды по id пользователя
  const {
    data: singleActivAwardUser,
    isLoading: isLoadingSingleActivAwardUser,
  } = awardApi.useGetActivAwardByUserQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      userId: awardId ? Number(awardId) : 0,
      baseRequest: undefined,
    },
    {
      skip: !typeOfUser && !awardId,
    }
  );
  // Получить награды в отделе
  const { data: awardsOnDepartment, isLoading: isLoadingAwardsOnDept } =
    awardApi.useGetByDeptQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: Number(awardId),
        state: active ? active : undefined,
        baseRequest: baseRequest ? baseRequest : undefined,
      },
      {
        skip: !typeOfUser,
      }
    );

  // Получить Актив наград по id в отделе
  const {
    data: awardsActivOnDepartment,
    isLoading: isLoadingAwardsActivOnDept,
  } = awardApi.useGetActivAwardByDeptQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(awardId),
      baseRequest: undefined,
    },
    {
      skip: !typeOfUser,
    }
  );

  // Получение наград доступных для награждения сотрудников текущим админом
  const {
    data: awardsAvailableForRewardUser,
    isLoading: isLoadingAwardsAvailableForRewardUser,
  } = awardApi.useGetAvailableBySubDeptsQuery(
    {
      authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      deptId: Number(awardId),
      baseRequest: baseRequest ? baseRequest : undefined,
    },
    {
      skip: !typeOfUser,
    }
  );

  const [deleteAward] = awardApi.useDeleteMutation();
  const [deleteUserReward] = awardApi.useSendActionMutation();

  return useMemo(() => {
    const deleteAwardAsync = async (awardId: number) => {
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
    };

    const userRewardAsync = async (
      awardId: number,
      actionType: ActionType,
      userId: number
    ) => {
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
            console.log(res);
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
    };

    return {
      deleteAwardAsync,
      singleAward,
      isLoadingSingleAward,
      awardsOnDepartment,
      isLoadingAwardsOnDept,
      singleActivAward,
      isLoadingSingleActivAward,
      awardsActivOnDepartment,
      isLoadingAwardsActivOnDept,
      singleActivAwardUser,
      isLoadingSingleActivAwardUser,
      userRewardAsync,
      awardsAvailableForRewardUser,
      isLoadingAwardsAvailableForRewardUser
    };
  }, [
    deleteAward,
    singleAward,
    isLoadingSingleAward,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
    singleActivAward,
    isLoadingSingleActivAward,
    back,
    awardsActivOnDepartment,
    isLoadingAwardsActivOnDept,
    singleActivAwardUser,
    isLoadingSingleActivAwardUser,
    typeOfUser,
    deleteUserReward,
    awardsAvailableForRewardUser,
    isLoadingAwardsAvailableForRewardUser
  ]);
};
