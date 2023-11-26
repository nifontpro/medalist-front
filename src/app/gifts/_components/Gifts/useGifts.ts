import { useFetchParams } from '@/hooks/useFetchParams';
import { useCallback, useMemo, useState } from 'react';
import { getGiftCreateUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { productApi } from '@/api/shop/product/product.api';

export const useGifts = () => {
  const { push } = useRouter();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();
  const selectCompany = Number(localStorage.getItem('selectCompany'));

  const [available, setAvailable] = useState<boolean>(true);
  const [availableCount, setAvailableCount] = useState<boolean>(true);

  // Получить призы в компании
  const {
    data: giftsOnCompany,
    isLoading,
    isFetching,
  } = productApi.useGetByCompanyQuery(
    {
      authId: typeOfUser?.id!,
      deptId: selectCompany,
      maxPrice: available ? undefined : typeOfUser?.scores,
      available: !availableCount,
      baseRequest: {
        page: page,
        pageSize: 12,
        orders: [{ field: 'price', direction: state }],
      },
    },
    {
      skip: !typeOfUser || !selectCompany,
    }
  );

  const totalPage = useMemo(
    () => giftsOnCompany?.pageInfo?.totalPages,
    [giftsOnCompany]
  );

  const giftCreateLink = useCallback(() => {
    push(getGiftCreateUrl());
  }, []);

  const handleSort = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
    setPage(0);
  }, [setPage, setState, state]);

  const giftLink = useCallback(
    (id: number) => {
      push('/gifts/' + id);
    },
    [push]
  );

  return {
    giftsOnCompany,
    isLoading,
    isFetching,
    giftCreateLink,
    giftLink,
    state,
    setState,
    handleSort,
    totalPage,
    page,
    prevPage,
    nextPage,
    setAvailable,
    available,
    setAvailableCount,
    availableCount,
    push,
  };
};
