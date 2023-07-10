import { useMemo, useState } from 'react';
import { useFetchParams } from '@/hooks/useFetchParams';
import { AwardState } from '@/types/award/Award';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';

const currentDate = Math.floor(new Date().getTime());

export const useActivity = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { back } = useRouter();

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
    searchHandleChange,
    setStartDateChange,
    setEndDateChange,
    startDate,
    endDate,
  } = useFetchParams();

  // const [startDate, setStartDate] = useState<number>(10000000);
  // const [endDate, setEndDate] = useState<number>(16732673054000);
  const [active, setActive] = useState<AwardState | undefined>(undefined);

  const { awardsActivOnDepartment, isLoadingAwardsActivOnDept } = useAwardAdmin(
    typeOfUser?.dept.id,
    {
      subdepts: true,
      page: page,
      pageSize: 5,
      filter: searchValue,
      minDate: startDate,
      maxDate: endDate,
      orders: [{ field: 'date', direction: state }],
    },
    active
  );
  console.log(awardsActivOnDepartment);
  const totalPage = awardsActivOnDepartment?.pageInfo?.totalPages;

  const { windowSize } = useWindowSize();

  return useMemo(() => {
    return {
      active,
      setActive,
      state,
      setState,
      searchValue,
      setPage,
      setSearchValue,
      searchHandleChange,
      typeOfUser,
      page,
      nextPage,
      prevPage,
      windowSize,
      awardsActivOnDepartment,
      totalPage,
      back,
      setStartDateChange,
      setEndDateChange,
    };
  }, [
    active,
    setActive,
    state,
    setState,
    searchValue,
    setPage,
    setSearchValue,
    searchHandleChange,
    typeOfUser,
    page,
    nextPage,
    prevPage,
    windowSize,
    awardsActivOnDepartment,
    totalPage,
    back,
    setStartDateChange,
    setEndDateChange,
  ]);
};
