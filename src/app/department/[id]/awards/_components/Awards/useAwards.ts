import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { AwardState } from '@/types/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useEffect, useMemo, useState } from 'react';

export const useAwards = (id: string) => {
  const [active, setActive] = useState<AwardState | undefined>(undefined);

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

  const {
    awardsOnDepartment,
    isLoadingAwardsOnDept,
    isFetchingUsersOnDepartment,
  } = useAwardAdmin(
    id,
    {
      page: page,
      pageSize: 12,
      orders: [{ field: 'startDate', direction: state }],
    },
    active
  );
  const totalPage = awardsOnDepartment?.pageInfo?.totalPages;

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetchingUsersOnDepartment) {
        if (totalPage && page < totalPage) {
          nextPage(awardsOnDepartment!);
        }
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [
    page,
    isFetchingUsersOnDepartment,
    setPage,
    awardsOnDepartment,
    nextPage,
    totalPage,
  ]);

  return {
    active,
    setActive,
    state,
    setState,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
    totalPage,
    page,
    nextPage,
    prevPage,
    setPage,
  };
};
