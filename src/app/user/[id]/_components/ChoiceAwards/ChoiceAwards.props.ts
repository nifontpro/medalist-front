import { Award } from '@/domain/model/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type ChoiceAwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  arrChoiceAward: string[];
  setArrChoiceAward: Dispatch<SetStateAction<string[]>>;
  awards: Award[];
  setSearchValue: Dispatch<SetStateAction<string>>;
};
