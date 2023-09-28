import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { useMemo } from 'react';

export const useStatisticUsersAwards = (departId: string) => {
  const switcher = useAppSelector((state) => state.switcher);

  const { userAwardWWCountOnDept, isLoadingUserAwardWWCountOnDept } =
    useAwardAdmin(departId, {
      // subdepts: switcher,
      subdepts: true,
    });

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
