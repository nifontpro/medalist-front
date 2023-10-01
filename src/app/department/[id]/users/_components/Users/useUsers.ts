import { userApi } from '@/api/user/user.api';
import { getUserCreateUrl } from '@/config/api.config';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useUsers = (id: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

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

  const startPage: number = useMemo(() => page + 1, [page]);

  // Получить сотрудников отдела/подотделов с наградами (через активность типа AWARD)
  const { data: usersOnDepartment, isLoading: isLoadingUsersOnDepartment } =
    userApi.useGetUsersWithAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
        baseRequest: {
          // subdepts: switcher,
          subdepts: true,
          page: page,
          pageSize: 10,
          filter: searchValue ? searchValue : undefined,
          orders: [{ field: 'lastname', direction: state }],
        },
      },
      {
        skip: !id || !typeOfUser,
      }
    );

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

  // // //Для подгрузки данных при скролле с использованием IntersectionObserver
  // useEffect(() => {
  //   const infinityObserver = new IntersectionObserver(
  //     ([entry], observer) => {
  //       if (entry.isIntersecting && totalPage && page < totalPage) {
  //         nextPage(usersOnDepartment!);
  //         observer.unobserve(entry.target);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );

  //   const lastUser = document.querySelector('.userCard:last-child');

  //   if (lastUser) {
  //     infinityObserver.observe(lastUser);
  //   }
  // });
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
    startPage,
  };
};
