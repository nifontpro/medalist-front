import { useUserAdmin } from '@/api/user/useUserAdmin';
import { getUserCreateUrl } from '@/config/api.config';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAppSelector } from '@/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export const useUsers = (id: string) => {
  const switcher = useAppSelector((state) => state.switcher);

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
    searchHandleChange,
  } = useFetchParams();

  const {
    usersOnDepartment,
    isLoadingUsersOnDepartment,
    isFetchingUsersOnDepartment,
  } = useUserAdmin(id, {
    // subdepts: switcher,
    subdepts: true,
    page: page,
    pageSize: 10,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });

  const totalPage = useMemo(
    () => usersOnDepartment?.pageInfo?.totalPages,
    [usersOnDepartment]
  );
  const countUsers = useMemo(
    () => usersOnDepartment?.pageInfo?.totalElements,
    [usersOnDepartment]
  );

  const handleSort = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
    setPage(0);
  }, [setPage, setState, state]);

  const handleSortWithoutPage = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
  }, [setState, state]);

  const createUser = useCallback(() => {
    push(getUserCreateUrl(`?deptId=${id}`));
  }, [id, push]);

  // //Для подгрузки данных при скролле с использованием IntersectionObserver
  useEffect(() => {
    const infinityObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting && totalPage && page < totalPage) {
          nextPage(usersOnDepartment!);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const lastUser = document.querySelector('.userCard:last-child');

    if (lastUser) {
      infinityObserver.observe(lastUser);
    }
  });
  //_______________________

  // //Для подгрузки данных при скролле с использованием EventListener
  // const onScroll = useCallback(() => {
  //   const scrolledToBottom =
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight;
  //   if (scrolledToBottom && !isFetchingUsersOnDepartment) {
  //     if (totalPage && page < totalPage) {
  //       nextPage(usersOnDepartment!);
  //     }
  //   }
  // }, [
  //   isFetchingUsersOnDepartment,
  //   nextPage,
  //   page,
  //   totalPage,
  //   usersOnDepartment,
  // ]);
  // useEffect(() => {
  //   document.addEventListener('scroll', onScroll);

  //   return function () {
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, [onScroll]);
  // //_______________________

  return {
    push,
    usersOnDepartment,
    isLoadingUsersOnDepartment,
    countUsers,
    totalPage,
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
    searchHandleChange,
    handleSort,
    handleSortWithoutPage,
    createUser,
  };
};
