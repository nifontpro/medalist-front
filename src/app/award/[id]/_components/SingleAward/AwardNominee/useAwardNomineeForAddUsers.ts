import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { User } from '@/types/user/user';
import { useMemo, useRef, useState } from 'react';

export const useAwardNomineeForAddUsers = (
  award: AwardDetails | null,
  awardActiv: Activity[] | null
) => {
  const {
    page: addUsersPage,
    setPage: addUsersSetPage,
    searchValue: addUsersSearchValue,
    setSearchValue: addUsersSetSearchValue,
    state: addUsersState,
    setState,
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
    let arrIdUserNominee: string[] = []; // Id тех кто наминирован
    awardActiv && awardActiv.forEach((user) => {
      // if (user.actionType == 'NOMINEE' && user && user.user && user.user.id)
      //   arrIdUserNominee.push(user.user.id.toString());
      if (user && user.user && user.user.id) {
        if (user.actionType == 'NOMINEE' || user.actionType == 'AWARD')
          arrIdUserNominee.push(user.user.id.toString());
      }
    });

    let arrUserNotNominee: User[] = []; // Те кто не наминирован
    usersOnSubDepartment &&
      usersOnSubDepartment.data?.forEach((user) => {
        if (
          arrIdUserNominee.find((item) => item == user.id?.toString()) ==
          undefined
        ) {
          arrUserNotNominee.push(user);
        }
      });

    let arrUserNominee: User[] = []; // Те кто номинирован
    awardActiv && awardActiv.forEach((user) => {
      if (user.actionType == 'NOMINEE' && user && user.user && user.user.id)
        arrUserNominee.push(user.user);
    });
    return {
      setVisibleModal,
      refOpen,
      ref,
      arrIdUserNominee,
      addUsersTotalPage,
      addUsersPage,
      visibleModal,
      addUsersNextPage,
      addUsersPrevPage,
      addUsersSetPage,
      addUsersSetSearchValue,
      usersOnSubDepartment,
      arrUserNotNominee,
    };
  }, [
    awardActiv,
    usersOnSubDepartment,
    addUsersTotalPage,
    addUsersPage,
    visibleModal,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersSetPage,
    addUsersSetSearchValue,
  ]);
};
