import { useEffect, useState } from 'react';
import { useFetchParams } from '@/hooks/useFetchParams';
import { AwardState } from '@/types/award/Award';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';
import { awardApi } from '@/api/award/award.api';

export const useActivity = (deptId: string | undefined) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const switcher = useAppSelector((state) => state.switcher);

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

  // Получить Актив наград по id в отделе
  const {
    data: awardsActivOnDepartment,
    isLoading: isLoadingAwardsActivOnDept,
    isFetching: isFetchingUsersActivOnDepartment,
  } = awardApi.useGetActivAwardByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
      awardState: active,
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
        page: page,
        pageSize: 20,
        filter: searchValue,
        minDate: startDate,
        maxDate: endDate,
        orders: [{ field: 'date', direction: state }],
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  const totalPage = awardsActivOnDepartment?.pageInfo?.totalPages;

  // //Для подгрузки данных при скролле с использованием IntersectionObserver
  useEffect(() => {
    const infinityObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting && totalPage && page < totalPage) {
          nextPage(awardsActivOnDepartment!);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const lastUser = document.querySelector('.activityCard:last-child');

    if (lastUser) {
      infinityObserver.observe(lastUser);
    }
  });
  //_______________________

  // //Для подгрузки данных при скролле
  // const onScroll = useCallback(() => {
  //   const scrolledToBottom =
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //   if (scrolledToBottom && !isFetchingUsersActivOnDepartment) {
  //     if (totalPage && page < totalPage) {
  //       nextPage(awardsActivOnDepartment!);
  //     }
  //   }
  // }, [
  //   awardsActivOnDepartment,
  //   isFetchingUsersActivOnDepartment,
  //   page,
  //   totalPage,
  //   nextPage,
  // ]);
  // useEffect(() => {
  //   document.addEventListener('scroll', onScroll);

  //   return function () {
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, [onScroll]);
  // //_______________________

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
