import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { AwardState } from '@/types/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAwardCreateUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';

export const useAwards = (id: string) => {
  const [active, setActive] = useState<AwardState | undefined>(undefined);

  const { push } = useRouter();

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
  const totalPage = useMemo(
    () => awardsOnDepartment?.pageInfo?.totalPages,
    [awardsOnDepartment]
  );

  const awardCreateLink = useCallback(() => {
    push(getAwardCreateUrl(`?deptId=${id}`));
  }, [id, push]);

  const handleSort = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
    setPage(0);
  }, [setPage, setState, state]);

  const awardLink = useCallback(
    (id: number) => {
      push('/award/' + id);
    },
    [push]
  );

  //Для подгрузки данных при скролле
  const onScroll = useCallback(() => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (scrolledToBottom && !isFetchingUsersOnDepartment) {
      if (totalPage && page < totalPage) {
        nextPage(awardsOnDepartment!);
      }
    }
  }, [
    page,
    isFetchingUsersOnDepartment,
    awardsOnDepartment,
    nextPage,
    totalPage,
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
    awardsOnDepartment,
    isLoadingAwardsOnDept,
    totalPage,
    page,
    nextPage,
    prevPage,
    setPage,
    awardCreateLink,
    handleSort,
    awardLink,
  };
};
