import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { AwardState } from '@/domain/model/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useMemo, useState } from 'react';

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

  const { awardsOnDepartment, isLoadingAwardsOnDept } = useAwardAdmin(
    id,
    {
      page: page,
      pageSize: 8,
      orders: [{ field: 'startDate', direction: state }],
    },
    active
  );

  // console.log(awardsOnDepartment)

  return useMemo(() => {
    const totalPage = awardsOnDepartment?.pageInfo?.totalPages;

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
      setPage
    };
  }, [
    active,
    setActive,
    state,
    setState,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
    page,
    nextPage,
    prevPage,
    setPage,
  ]);
};
