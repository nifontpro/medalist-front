import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { useState, useMemo } from 'react';

export const useFetchParams = () => {
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [state, setState] = useState<'ASC' | 'DESC'>('ASC');

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

    return {
      nextPage,
      prevPage,
      page,
      setPage,
      searchValue,
      setSearchValue,
      state,
      setState,
    };
  }, [page, setPage, searchValue, setSearchValue, state, setState]);
};
