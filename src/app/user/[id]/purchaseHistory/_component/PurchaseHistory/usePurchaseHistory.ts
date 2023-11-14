import { payApi } from '@/api/shop/pay/pay.api';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { PayCode } from '@/types/shop/pay/PayData';
import { useCallback, useMemo, useState } from 'react';

export const usePurchaseHistory = (id: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const selectedCompany = localStorage.getItem('selectCompany');

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
    startDate,
    endDate,
    setStartDateChange,
    setEndDateChange,
  } = useFetchParams();

  const [payCode, setPayCode] = useState<PayCode>('UNDEF');

  // Получить призы
  const {
    data: gifts,
    isLoading: isLoadingGifts,
    isFetching: isFetchingGifts,
  } = payApi.useGetByCompanyQuery(
    {
      authId: typeOfUser?.id!,
      userId: Number(id),
      deptId: Number(selectedCompany),
      payCode, // Необязательный фильтр по типу операции
      isActive: undefined, // Необязательный фильтр по активному состоянию операции
      baseRequest: {
        minDate: startDate,
        maxDate: endDate,
        page: page,
        pageSize: 12,
        orders: [{ field: 'dateOp', direction: state }],
      },
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const totalPage = useMemo(() => gifts?.pageInfo?.totalPages, [gifts]);

  const handleSort = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
    setPage(0);
  }, [setPage, setState, state]);

  // // //Для подгрузки данных при скролле с использованием IntersectionObserver
  // useEffect(() => {
  //   const infinityObserver = new IntersectionObserver(
  //     ([entry], observer) => {
  //       if (entry.isIntersecting && totalPage && page < totalPage) {
  //         nextPage(gifts!);
  //         observer.unobserve(entry.target);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );

  //   const lastgift = document.querySelector('.historyCard:last-child');

  //   if (lastgift) {
  //     infinityObserver.observe(lastgift);
  //   }
  // });
  // //_______________________

  return {
    gifts,
    isLoadingGifts,
    setPayCode,
    payCode,
    handleSort,
    state,
    setStartDateChange,
    setEndDateChange,
    totalPage,
    prevPage,
    page,
    nextPage,
    setState,
  };
};
