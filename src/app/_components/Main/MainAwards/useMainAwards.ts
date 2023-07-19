import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useMainAwards = () => {
  const { push } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const {
    colAwardsOnDepartment,
    isLoadingColAwardsOnDept,
    colAwardsActivRoot,
    isLoadingColAwardsActivRoot,
  } = useAwardAdmin(typeOfUser?.dept.id, { subdepts: true });

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(typeOfUser?.dept.id, { subdepts: true });

  let countAll = useMemo(
    () =>
      colAwardsOnDepartment &&
      colAwardsOnDepartment.data &&
      colAwardsOnDepartment?.data?.finish +
        colAwardsOnDepartment?.data?.nominee +
        colAwardsOnDepartment?.data?.future +
        colAwardsOnDepartment?.data?.error,
    [colAwardsOnDepartment]
  );

  let countUserWithAwardAndWithout = useMemo(
    () => usersOnDepartmentWithAwards?.data?.length,
    [usersOnDepartmentWithAwards]
  );

  let countUserWithAward = useMemo(
    () =>
      usersOnDepartmentWithAwards?.data?.filter((user) => user.awardCount > 0)
        .length,
    [usersOnDepartmentWithAwards]
  );

  let countUserWithAwardPercent = useMemo(
    () =>
      countUserWithAward &&
      countUserWithAwardAndWithout &&
      Math.ceil((countUserWithAward * 100) / countUserWithAwardAndWithout),
    [countUserWithAward, countUserWithAwardAndWithout]
  );

  let numberIsNaN = useMemo(
    () => Number.isNaN(countUserWithAwardPercent),
    [countUserWithAwardPercent]
  );

  return {
    push,
    countUserWithAwardPercent,
    countUserWithAward,
    countAll,
    typeOfUser,
    colAwardsActivRoot,
    isLoadingColAwardsActivRoot,
    numberIsNaN,
  };
};
