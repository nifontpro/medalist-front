
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { useMemo, useState } from 'react';

export const useAwards = (awards: AwardDetails[]) => {
  const [state, setState] = useState<1 | -1>(-1);

  let allAwards = awards.filter((award) => award.award.type == 'SIMPLE');
  let allNominee = awards.filter((award) => award.award.type == 'NOMINEE');

  const [active, setActive] = useState<
    '' | 'NOMINEE' | 'SIMPLE' | 'UNDEF'
  >('');

  // Сотртировка по startDate
  const filteredValue = awards?.filter((item) => item.award.type?.includes(active));

  if (filteredValue) {
    filteredValue.sort((prev, next): number => {
      if (prev.award.startDate !== undefined && next.award.startDate !== undefined) {
        if (prev?.award.startDate > next?.award.startDate) return state; //(-1)
      }
      return state;
    });
  }

  // const handleNextPage = () => {
  //   if (awardsFull && awardsFull.length > 0) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  return useMemo(() => {
    return {
      allAwards,
      allNominee,
      active,
      setActive,
      state,
      setState,
      filteredValue,
    };
  }, [
    allAwards,
    allNominee,
    active,
    setActive,
    state,
    setState,
    filteredValue,
  ]);
};
