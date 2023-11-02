import { AwardState } from '@/types/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAwardCreateUrl } from '@/config/api.config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';
import { productApi } from '@/api/shop/product/product.api';

export const useGifts = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награды в отделе
  const {
    data: giftsOnCompany,
    isLoading,
    isFetching,
  } = productApi.useGetByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: typeOfUser?.dept.id!,
    },
    {
      skip: !typeOfUser,
    }
  );

  // const awardCreateLink = useCallback(() => {
  //   push(getAwardCreateUrl(`?deptId=${id}`));
  // }, [id, push]);

  // const handleSort = useCallback(() => {
  //   state == 'ASC' ? setState('DESC') : setState('ASC');
  //   setPage(0);
  // }, [setPage, setState, state]);

  // const awardLink = useCallback(
  //   (id: number) => {
  //     push('/award/' + id);
  //   },
  //   [push]
  // );

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
  };
};
