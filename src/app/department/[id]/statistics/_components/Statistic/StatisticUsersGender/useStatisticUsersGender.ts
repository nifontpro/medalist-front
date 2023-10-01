import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useMemo } from 'react';

export const useStatisticUsersGender = (departId: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const switcher = useAppSelector((state) => state.switcher);

  // Получить пользоветлей в отделе
  const {
    data: usersOnDepartment,
    isLoading: isLoadingUsersOnDepartment,
    isFetching: isFetchingUsersOnDepartment,
  } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(departId),
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
        filter: '',
      },
    },
    {
      skip: !typeOfUser,
    }
  );

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
