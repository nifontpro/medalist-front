import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useMemo } from 'react';

export const useStatisticUsersAwards = (departId: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const switcher = useAppSelector((state) => state.switcher);

  // Получение количества сотрудников с наградами и без них в отделе(ах)
  const {
    data: userAwardWWCountOnDept,
    isLoading: isLoadingUserAwardWWCountOnDept,
  } = awardApi.useGetUserAwardWWCountOnDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(departId),
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
      },
    },
    {
      skip: !departId || !typeOfUser,
    }
  );

  let countWithAward = useMemo(
    () => userAwardWWCountOnDept?.data?.withAward,
    [userAwardWWCountOnDept]
  );

  let countWithoutAward = useMemo(
    () => userAwardWWCountOnDept?.data?.withoutAward,
    [userAwardWWCountOnDept]
  );

  let countAll = useMemo(
    () =>
      userAwardWWCountOnDept?.data &&
      userAwardWWCountOnDept?.data?.withAward +
        userAwardWWCountOnDept?.data?.withoutAward,
    [userAwardWWCountOnDept]
  );

  let countWithAwardPercent = useMemo(
    () =>
      countWithAward &&
      countAll &&
      Math.ceil((countWithAward * 100) / countAll),
    [countAll, countWithAward]
  );

  let countWithoutAwardPercent = useMemo(
    () =>
      countWithoutAward &&
      countAll &&
      Math.ceil((countWithoutAward * 100) / countAll),
    [countAll, countWithoutAward]
  );

  return {
    countWithAward,
    countWithoutAward,
    countWithoutAwardPercent,
    countWithAwardPercent,
  };
};
