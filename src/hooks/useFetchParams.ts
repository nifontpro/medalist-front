import { BaseResponse } from '@/types/base/BaseResponse';
import { useState, useMemo, useCallback } from 'react';

export const useFetchParams = () => {
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [state, setState] = useState<'ASC' | 'DESC'>('DESC');
  const [startDate, setStartDate] = useState<number | undefined>(undefined);
  const [endDate, setEndDate] = useState<number | undefined>(undefined);

  const setStartDateChange = useCallback((data: number) => {
    setStartDate(data);
    setPage(0);
  }, []);

  const setEndDateChange = useCallback((data: number) => {
    setEndDate(data);
    setPage(0);
  }, []);

  const nextPage = useCallback(
    (data: BaseResponse<any>) => {
      if (data?.pageInfo?.totalPages && data?.pageInfo?.totalPages > page + 1) {
        setPage((prev) => prev + 1);
      }
    },
    [page]
  );

  const prevPage = useCallback(() => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const searchHandleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      setPage(0);
    },
    []
  );

  const sortChange = useCallback(() => {
    state == 'ASC' ? setState('DESC') : setState('ASC');
    setPage(0);
  }, [state]);

  return {
    nextPage,
    prevPage,
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    searchHandleChange,
    setStartDateChange,
    setEndDateChange,
    startDate,
    endDate,
    sortChange,
  };
};
