import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useUsers = (id: string) => {
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
    page: page,
    pageSize: 10,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });
  const totalPage = usersOnDepartment?.pageInfo?.totalPages;
  const countUsers = usersOnDepartment?.pageInfo?.totalElements;

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetchingUsersOnDepartment) {
        if (totalPage && page < totalPage) {
          nextPage(usersOnDepartment!);
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
    usersOnDepartment,
    nextPage,
    totalPage,
  ]);

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
  };
};
