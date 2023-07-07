import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Award } from '@/types/award/Award';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

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

  const deptId = user?.data?.user.dept.id;

  //Фильтр тех медалей, которыми не награжден еще
  const {
    awardsAvailableForRewardUser,
    isLoadingAwardsAvailableForRewardUser,
  } = useAwardAdmin(deptId, {
    page: page,
    pageSize: 100,
    filter: searchValue,
  });

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleModalEvent, setVisibleModalEvent] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
    setSearchValue('');
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);
  return useMemo(() => {
    const totalPage = awardsAvailableForRewardUser?.pageInfo?.totalPages;

    let arrAwardRewarded: string[] = []; // Массив id медалей, которыми награжден
    userActiv?.data?.forEach((award) => {
      if (award.award?.type == 'SIMPLE' && award.award) {
        arrAwardRewarded.push(award.award?.id.toString());
      }
    });

    let arrAwardNotRewarded: Award[] = []; // Массив медалей, которыми может быть награжден и не был награжден до этого

    awardsAvailableForRewardUser?.data?.forEach((award) => {
      if (award.state == 'FINISH') {
        if (
          arrAwardRewarded.find((item) => item == award.id.toString()) ==
          undefined
        ) {
          arrAwardNotRewarded.push(award);
        }
      }
    });
    return {
      totalPage,
      arrAwardRewarded,
      awardsAvailableForRewardUser,
      visibleModal,
      setVisibleModal,
      ref,
      refOpen,
      visibleModalEvent,
      setVisibleModalEvent,
      isLoadingAwardsAvailableForRewardUser,
      user,
      isLoadingSingleUser,
      userActiv,
      page,
      setPage,
      searchValue,
      setSearchValue,
      state,
      setState,
      nextPage,
      prevPage,
      back,
      arrAwardNotRewarded,
      searchHandleChange,
    };
  }, [
    awardsAvailableForRewardUser,
    back,
    isLoadingAwardsAvailableForRewardUser,
    isLoadingSingleUser,
    nextPage,
    page,
    prevPage,
    searchValue,
    setPage,
    setSearchValue,
    setState,
    state,
    user,
    userActiv,
    visibleModal,
    visibleModalEvent,
    searchHandleChange,
  ]);
};
