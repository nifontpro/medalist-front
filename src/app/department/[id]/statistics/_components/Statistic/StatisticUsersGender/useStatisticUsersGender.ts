import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { useMemo } from 'react';

export const useStatisticUsersGender = (departId: string) => {
  const switcher = useAppSelector((state) => state.switcher);

  const { usersOnDepartment } = useUserAdmin(departId, {
    // subdepts: switcher,
    subdepts: true,
    filter: '',
  });

  let countAll = useMemo(
    () => usersOnDepartment?.data?.length,
    [usersOnDepartment]
  );

  let countMale = useMemo(
    () =>
      usersOnDepartment?.data?.filter(
        (user) => user.gender == 'MALE' || user.gender == 'UNDEF'
      ).length,
    [usersOnDepartment]
  );

  let countMalePercent = useMemo(
    () => countMale && countAll && Math.ceil((countMale * 100) / countAll),
    [countAll, countMale]
  );

  let countFemale = useMemo(
    () =>
      usersOnDepartment?.data?.filter((user) => user.gender == 'FEMALE').length,
    [usersOnDepartment]
  );

  let countFemalePercent = useMemo(
    () => countFemale && countAll && Math.floor((countFemale * 100) / countAll),
    [countAll, countFemale]
  );

  return { countMale, countFemale, countFemalePercent, countMalePercent };
};
