import { Award, AwardState } from '@/types/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type FilterAwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  state: 'ASC' | 'DESC';
  setState: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  active: AwardState | undefined;
  setActive: Dispatch<SetStateAction<AwardState | undefined>>;
  // allNominee: Award[] | undefined
  // allAwards: Award[] | undefined
  awardsFull: Award[];
};
