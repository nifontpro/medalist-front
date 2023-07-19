import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useMemo } from 'react';

export const useStatisticUsersAwards = (departId: string) => {
  const { userAwardWWCountOnDept, isLoadingUserAwardWWCountOnDept } =
    useAwardAdmin(departId);

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
