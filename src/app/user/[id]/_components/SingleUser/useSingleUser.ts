import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Award } from '@/types/award/Award';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useSingleUser = (id: string) => {
  const { back } = useRouter();
  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    searchHandleChange,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  const { singleUser: user, isLoadingSingleUser } = useUserAdmin(id);
  const { singleActivAwardUser: userActiv } = useAwardAdmin(id);

  const deptId = useMemo(() => user?.data?.user.dept.id, [user]);

  const [arrChoiceAward, setArrChoiceAward] = useState<string[]>([]);

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleModalEvent, setVisibleModalEvent] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setArrChoiceAward([]);
    setVisibleModal(false);
    setSearchValue('');
  }, [setSearchValue]);
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  return {
    visibleModal,
    setVisibleModal,
    ref,
    refOpen,
    visibleModalEvent,
    setVisibleModalEvent,
    user,
    isLoadingSingleUser,
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
    back,
    searchHandleChange,
    userActiv,
    arrChoiceAward,
    setArrChoiceAward,
  };
};
