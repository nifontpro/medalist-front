import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useMemo } from 'react';

export const useStatisticUsersGender = (departId: string) => {
  const { usersGenderOnDepartment, isLoadingUsersGenderOnDepartment } =
    useUserAdmin(departId, { subdepts: true });

  let countAll = useMemo(
    () => usersGenderOnDepartment?.data?.length,
    [usersGenderOnDepartment]
  );

  let countMale = useMemo(
    () =>
      usersGenderOnDepartment?.data?.filter(
        (user) => user.gender == 'MALE' || user.gender == 'UNDEF'
      ).length,
    [usersGenderOnDepartment]
  );

  let countMalePercent = useMemo(
    () => countMale && countAll && Math.ceil((countMale * 100) / countAll),
    [countAll, countMale]
  );

  let countFemale = useMemo(
    () =>
      usersGenderOnDepartment?.data?.filter((user) => user.gender == 'FEMALE')
        .length,
    [usersGenderOnDepartment]
  );

  let countFemalePercent = useMemo(
    () => countFemale && countAll && Math.floor((countFemale * 100) / countAll),
    [countAll, countFemale]
  );

  return { countMale, countFemale, countFemalePercent, countMalePercent };
};
