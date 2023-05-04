
import { Award } from '@/domain/model/award/Award';
import { useMemo, useState } from 'react';

export const useAwards = (awards: Award[]) => {
  const [state, setState] = useState<1 | -1>(-1);

  let allAwards = awards.filter((award) => award.type == 'SIMPLE');
  let allNominee = awards.filter((award) => award.type == 'PERIOD');

  const [active, setActive] = useState<
    '' | "PERIOD" | "SIMPLE" | "UNDEF"
  >('');

  // Сотртировка по startDate
  const filteredValue = awards?.filter((item) => item.type?.includes(active));

  if (filteredValue) {
    filteredValue.sort((prev, next): number => {
      if (prev.startDate !== undefined && next.startDate !== undefined) {
        if (prev?.startDate > next?.startDate) return state; //(-1)
      }
      return state;
    });
  }

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
