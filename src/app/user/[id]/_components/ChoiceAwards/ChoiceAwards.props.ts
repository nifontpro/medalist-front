import { Award } from '@/types/award/Award';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  FormEvent,
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
  searchHandleChange: (event: FormEvent<HTMLInputElement>) => void;
};
