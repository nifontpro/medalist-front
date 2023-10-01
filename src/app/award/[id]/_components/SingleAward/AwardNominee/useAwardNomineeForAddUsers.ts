import { userApi } from '@/api/user/user.api';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { AwardDetails } from '@/types/award/AwardDetails';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useAwardNomineeForAddUsers = (award: AwardDetails | null) => {
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
    setState,
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
      awardId: award?.award?.id!,
      actionType: undefined,
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

  const handlerOpenAddUser = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);

  return {
    setVisibleModal,
    refOpen,
    ref,
    addUsersTotalPage,
    addUsersPage,
    visibleModal,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersSetPage,
    addUsersSetSearchValue,
    handlerOpenAddUser,
    availableUsersBySubDeptForAwards,
    addUsersSearchHandleChange,
  };
};
