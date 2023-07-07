import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { User } from '@/types/user/user';
import { useMemo, useRef, useState } from 'react';

export const useAwardWasAwardedForAddUsers = (
  award: AwardDetails | null,
  awardActiv: Activity[] | null
) => {
  const {
    page: addUsersPage,
    setPage: addUsersSetPage,
    searchValue: addUsersSearchValue,
    setSearchValue: addUsersSetSearchValue,
    state: addUsersState,
    nextPage: addUsersNextPage,
    prevPage: addUsersPrevPage,
  } = useFetchParams();

  const { usersOnSubDepartment } = useUserAdmin(
    award?.award.dept.id?.toString(),
    {
      page: addUsersPage,
      pageSize: 100,
      filter: addUsersSearchValue,
      orders: [{ field: 'lastname', direction: addUsersState }],
    }
  );
  const addUsersTotalPage = usersOnSubDepartment?.pageInfo?.totalPages;

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
    addUsersSetSearchValue('');
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  return useMemo(() => {
    //Фильтр тех кто еще не участвует в номинации
    let arrIdUserRewarded: string[] = [];
    awardActiv!.forEach((user) => {
      if (user.actionType == 'AWARD' && user && user.user && user.user.id)
        arrIdUserRewarded.push(user.user.id.toString());
    });
    let arrUserNotAwarded: User[] = [];
    usersOnSubDepartment &&
      usersOnSubDepartment.data?.forEach((user) => {
        if (
          arrIdUserRewarded.find((item) => item == user.id?.toString()) ==
          undefined
        ) {
          arrUserNotAwarded.push(user);
        }
      });
    return {
      usersOnSubDepartment,
      ref,
      refOpen,
      visibleModal,
      setVisibleModal,
      arrIdUserRewarded,
      arrUserNotAwarded,
      addUsersPage,
      addUsersSetPage,
      addUsersSearchValue,
      addUsersSetSearchValue,
      addUsersState,
      addUsersNextPage,
      addUsersPrevPage,
      addUsersTotalPage,
    };
  }, [
    awardActiv,
    usersOnSubDepartment,
    ref,
    refOpen,
    visibleModal,
    setVisibleModal,
    addUsersNextPage,
    addUsersPage,
    addUsersPrevPage,
    addUsersSearchValue,
    addUsersSetPage,
    addUsersSetSearchValue,
    addUsersState,
    addUsersTotalPage,
  ]);
};
