import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { User } from '@/types/user/user';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useAwardWasAwardedForAddUsers = (
  award: AwardDetails | null,
  awardActiv: Activity[] | null
) => {
  const {
    page: addUsersPage,
    setPage: addUsersSetPage,
    searchValue: addUsersSearchValue,
    setSearchValue: addUsersSetSearchValue,
    searchHandleChange: addUsersSearchHandleChange,
    state: addUsersState,
    nextPage: addUsersNextPage,
    prevPage: addUsersPrevPage,
  } = useFetchParams();

  const {
    availableUsersBySubDeptForAwards,
    isLoadingAvailableUsersBySubDeptForAwards,
  } = useUserAdmin(
    award?.award.dept.id?.toString(),
    {
      subdepts: true,
      page: addUsersPage,
      pageSize: 10,
      filter: addUsersSearchValue,
      orders: [{ field: 'firstname', direction: addUsersState }],
    },
    award?.award.id,
    'AWARD'
  );
  const addUsersTotalPage = useMemo(
    () => availableUsersBySubDeptForAwards?.pageInfo?.totalPages,
    [availableUsersBySubDeptForAwards]
  );

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisibleModal(false);
    addUsersSetSearchValue('');
  }, [addUsersSetSearchValue]);
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  const handlerAddUsers = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);

  return {
    ref,
    refOpen,
    visibleModal,
    setVisibleModal,
    addUsersPage,
    addUsersSetPage,
    addUsersSearchValue,
    addUsersSetSearchValue,
    addUsersState,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersTotalPage,
    handlerAddUsers,
    addUsersSearchHandleChange,
    availableUsersBySubDeptForAwards,
  };
};
