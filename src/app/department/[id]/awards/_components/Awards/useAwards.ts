import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { Award } from '@/domain/model/award/Award';
import { useMemo, useState } from 'react';

export type SortAwardsType = '' | 'FUTURE' | 'NOMINEE' | 'FINISH' | 'ERROR';

export const useAwards = (id: string) => {
  const [page, setPage] = useState<number>(0);
  const [state, setState] = useState<'ASC' | 'DESC'>('ASC');
  const [active, setActive] = useState<SortAwardsType>('');

  const { awardsOnDepartment, isLoadingAwardsOnDept } = useAwardAdmin(id, {
    page: page,
    pageSize: 100,
    // orders: [{ field: 'endDate', direction: state }],
  });

  console.log(awardsOnDepartment);

  // let allAwards = awards?.filter(
  //   (award) => award.state == 'FINISH' || award.state == 'ERROR'
  // );
  // let allNominee = awards?.filter(
  //   (award) => award.state == 'NOMINEE' || award.state == 'FUTURE'
  // );

  // // Сотртировка по startDate
  // const filteredValue = awards?.filter((item) => {
  //   if (active == 'NOMINEE') {
  //     return item.state?.includes('FUTURE') || item.state?.includes(active);
  //   } else {
  //     return item.state?.includes(active);
  //   }
  // });

  // if (filteredValue) {
  //   filteredValue.sort((prev, next): number => {
  //     if (prev.startDate !== undefined && next.startDate !== undefined) {
  //       if (prev?.startDate > next?.startDate) return state; //(-1)
  //     }
  //     return state;
  //   });
  // }

  return useMemo(() => {
    return {
      // allAwards,
      // allNominee,
      active,
      setActive,
      state,
      setState,
      // filteredValue,
      awardsOnDepartment,
      isLoadingAwardsOnDept,
    };
  }, [
    // allAwards,
    // allNominee,
    active,
    setActive,
    state,
    setState,
    // filteredValue,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
  ]);
};
