import { Award, AwardState } from '@/types/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type FilterGiftsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  state: 'ASC' | 'DESC';
  setState: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  available: boolean;
  setAvailable: Dispatch<SetStateAction<boolean>>;
};
