import { BaseResponse } from '@/types/base/BaseResponse';
import { useState, useMemo } from 'react';

export const useFetchParams = () => {
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [state, setState] = useState<'ASC' | 'DESC'>('DESC');

  return useMemo(() => {
    const nextPage = (data: BaseResponse<any>) => {
      if (data?.pageInfo?.totalPages && data?.pageInfo?.totalPages > page + 1) {
        setPage((prev) => prev + 1);
      }
    };
    const prevPage = () => {
      if (page > 0) {
        setPage((prev) => prev - 1);
      }
    };

    const searchHandleChange = (event: React.FormEvent<HTMLInputElement>) => {
      setSearchValue(event.currentTarget.value);
      setPage(0);
    };

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
    };
  }, [page, setPage, searchValue, setSearchValue, state, setState]);
};
