import { userApi } from '@/api/user/user.api';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { AwardDetails } from '@/types/award/AwardDetails';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useAwardWasAwardedForAddUsers = (award: AwardDetails | null) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

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

  // Получить сотрудников которых можно наградить выбранной медалью
  const {
    data: availableUsersBySubDeptForAwards,
    isLoading: isLoadingAvailableUsersBySubDeptForAwards,
  } = userApi.useGetAvailableUsersBySubDeptForAwardsQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(award?.award.dept.id),
      awardId: award?.award.id!,
      actionType: 'AWARD',
      baseRequest: {
        subdepts: true,
        page: addUsersPage,
        pageSize: 100,
        filter: addUsersSearchValue,
        orders: [{ field: 'firstname', direction: addUsersState }],
      },
    },
    {
      skip: !typeOfUser,
    }
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
