import { awardApi } from '@/api/award/award.api';
import { payApi } from '@/api/shop/pay/pay.api';
import { productApi } from '@/api/shop/product/product.api';
import { userApi } from '@/api/user/user.api';
import { useFetchParams } from '@/hooks/useFetchParams';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useSingleUser = (id: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const selectCompany = Number(localStorage.getItem('selectCompany'));

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

  // Получить пользоветля по id
  const { data: user, isLoading: isLoadingSingleUser } =
    userApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  // Получить Актив награды по id пользователя
  const { data: userActiv, isLoading: isLoadingSingleActivAwardUser } =
    awardApi.useGetActivAwardByUserQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(id),
        baseRequest: undefined,
        awardType: undefined,
      },
      {
        skip: !id || !typeOfUser,
      }
    );

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

  // Получение наград типа SIMPLE доступных для награждения сотрудников текущим админом
  const {
    data: awardsAvailableForRewardUserSimple,
    isLoading: isLoadingAwardsAvailableForRewardUserSimple,
  } = awardApi.useGetAvailableAwardsForRewardBySubDeptsQuery(
    {
      authId: typeOfUser?.id!,
      userId: Number(id),
      baseRequest: { filter: searchValue },
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const totalPage = useMemo(
    () => awardsAvailableForRewardUserSimple?.pageInfo?.totalPages,
    [awardsAvailableForRewardUserSimple]
  );

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
    totalPage,
    awardsAvailableForRewardUserSimple,
  };
};
