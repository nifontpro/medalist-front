import { useCallback, useEffect, useState } from 'react';
import { useFetchParams } from '@/hooks/useFetchParams';
import { AwardState } from '@/types/award/Award';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';

export const useActivity = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { back } = useRouter();

  const { windowSize } = useWindowSize();

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
    sortChange,
  } = useFetchParams();

  const [active, setActive] = useState<AwardState | undefined>(undefined);

  const {
    awardsActivOnDepartment,
    isLoadingAwardsActivOnDept,
    isFetchingUsersActivOnDepartment,
  } = useAwardAdmin(
    typeOfUser?.dept.id,
    {
      subdepts: true,
      page: page,
      pageSize: 20,
      filter: searchValue,
      minDate: startDate,
      maxDate: endDate,
      orders: [{ field: 'date', direction: state }],
    },
    active
  );
  const totalPage = awardsActivOnDepartment?.pageInfo?.totalPages;

  //Для подгрузки данных при скролле
  const onScroll = useCallback(() => {
    const scrolledToBottom = 
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (scrolledToBottom && !isFetchingUsersActivOnDepartment) {
      if (totalPage && page < totalPage) {
        nextPage(awardsActivOnDepartment!);
      }
    }
  }, [
    awardsActivOnDepartment,
    isFetchingUsersActivOnDepartment,
    page,
    totalPage,
    nextPage,
  ]);
  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
  //_______________________

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
    sortChange,
  };
};
