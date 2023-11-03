import { AwardState } from '@/types/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAwardCreateUrl, getGiftCreateUrl } from '@/config/api.config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';
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

  // Получить призы в компании
  const {
    data: giftsOnCompany,
    isLoading,
    isFetching,
  } = productApi.useGetByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: selectCompany,
    },
    {
      skip: !typeOfUser || !selectCompany,
    }
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

  // // //Для подгрузки данных при скролле с использованием IntersectionObserver
  // useEffect(() => {
  //   const infinityObserver = new IntersectionObserver(
  //     ([entry], observer) => {
  //       if (entry.isIntersecting && totalPage && page < totalPage) {
  //         nextPage(awardsOnDepartment!);
  //         observer.unobserve(entry.target);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );

  //   const lastUser = document.querySelector('.awardCard:last-child');

  //   if (lastUser) {
  //     infinityObserver.observe(lastUser);
  //   }
  // });
  // //_______________________

  return {
    giftsOnCompany,
    isLoading,
    isFetching,
    giftCreateLink,
    giftLink,
    state,
    handleSort,
  };
};