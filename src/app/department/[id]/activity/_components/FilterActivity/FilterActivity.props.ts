import { AwardState } from '@/types/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type FilterActivityProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  state: 'ASC' | 'DESC';
  setState: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  active: AwardState | undefined;
  setActive: Dispatch<SetStateAction<AwardState | undefined>>;
  setStartDateChange: (data: number) => void;
  setEndDateChange: (data: number) => void;
  startDate?: number;
  endDate?: number;
};
