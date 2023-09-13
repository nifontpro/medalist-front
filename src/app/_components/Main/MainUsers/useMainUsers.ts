import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { IOptionInterval } from '@/ui/SelectIntervalDateUsers/SelectIntervalDateUsers.interface';
import { useMemo, useState } from 'react';

let currentDate = Math.floor(new Date().getTime());
let oneYear = 31556926000;

export const useMainUsers = (deptId: string | undefined) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Для выбора интервала по показу статистики пользователей
  const [dataInterval, setDataInterval] = useState<IOptionInterval | null>(
    null
  );
  const roles: IOptionInterval[] = [
    {
      label: 'За год',
      value: currentDate - oneYear,
    },
    {
      label: 'За полгода',
      value: currentDate - oneYear / 2,
    },
    {
      label: 'За квартал',
      value: currentDate - 31556926000 / 4,
    },
    {
      label: 'За месяц',
      value: currentDate - 31556926000 / 12,
    },
  ];
  // __________________

  const switcher = useAppSelector((state) => state.switcher); // показывать подотделы или нет
  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();
  const pageSize: number = useMemo(() => 8, []);
  const startPage: number = useMemo(() => page + 1, [page]);

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(deptId ? deptId : typeOfUser?.dept.id, {
      orders: [{ field: '(scores)', direction: 'DESC' }],
      // subdepts: switcher,
      subdepts: true,
      page: page,
      pageSize,
      minDate: dataInterval ? dataInterval.value : currentDate - 31556926000, // Вычитаем год, чтобы получить за прошедший 1 год лучших
      maxDate: currentDate,
    });

  const totalPage = useMemo(
    () => usersOnDepartmentWithAwards?.pageInfo?.totalPages,
    [usersOnDepartmentWithAwards]
  );

  return {
    dataInterval,
    setDataInterval,
    roles,
    isLoadingUsersOnDepartmentWithAwards,
    usersOnDepartmentWithAwards,
    page,
    pageSize,
    totalPage,
    startPage,
    nextPage,
    prevPage,
  };
};
