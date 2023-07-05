// import { useCompanyState } from '@/company/data/company.slice';
import { useMemo, useState } from 'react';
// import { activityApi } from '../data/activity.api';
// import { IActivity } from '../model/activity.types';
// import { AwardState } from '@/types/award/Award';
import { useFetchParams } from '@/hooks/useFetchParams';
import { AwardState } from '@/types/award/Award';

const currentDate = Math.floor(new Date().getTime());

export const useActivity = () =>
  // filter?: string,
  // sort?: number,
  // startDateProps?: number,
  // endDateProps?: number
  {
    const {
      page,
      setPage,
      searchValue,
      setSearchValue,
      state,
      setState,
      nextPage,
      prevPage,
      searchHandleChange,
    } = useFetchParams();

    // const { usersOnDepartment, isLoadingUsersOnDepartment } = useUserAdmin(id, {
    //   page: page,
    //   pageSize: 5,
    //   filter: searchValue,
    //   orders: [{ field: 'lastname', direction: state }],
    // });

    // const totalPage = usersOnDepartment?.pageInfo?.totalPages;

    // const [state, setState] = useState<'ASC' | 'DESC'>('ASC');
    const [startDate, setStartDate] = useState<number>(10000000);
    const [endDate, setEndDate] = useState<number>(16732673054000);
    const [active, setActive] = useState<AwardState | undefined>(undefined);

    return useMemo(() => {
      return {
        active,
        setActive,
        // allActivityLength,
        // awardsLength,
        // nomineeLength,
        // otherLength,
        state,
        setState,
        setStartDate,
        setEndDate,
        // handleChange,
        // filteredValue,
        // activity,
        // isFetching,
        // setCurrentPage,
        // handleNextPage,
        searchValue,
        startDate,
        endDate,
        // setSizePage,
        // setArr,
        setPage,
        setSearchValue,
        searchHandleChange,
      };
    }, [
      active,
      setActive,
      // allActivityLength,
      // awardsLength,
      // nomineeLength,
      // otherLength,
      state,
      setState,
      setStartDate,
      setEndDate,
      // filteredValue,
      // activity,
      // isFetching,
      // setCurrentPage,
      searchValue,
      startDate,
      endDate,
      // setSizePage,
      // setArr,
      setPage,
      setSearchValue,
      searchHandleChange,
      // handleChange,
      // handleNextPage,
    ]);
  };
