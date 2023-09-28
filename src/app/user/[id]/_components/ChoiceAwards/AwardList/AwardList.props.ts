import { Award } from '@/types/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type AwardListProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  allChecked: boolean;
  award: Award;
  setVisibleCheckbox: Dispatch<SetStateAction<boolean>>;
  setArrChoiceUser: Dispatch<SetStateAction<string[]>>;
  arrChoiceUser: string[];
};
