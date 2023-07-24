import { User } from '@/types/user/user';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  FormEvent,
  SetStateAction,
} from 'react';

export type ChoiceUsersProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  arrChoiceUser: string[];
  setArrChoiceUser: Dispatch<SetStateAction<string[]>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  users: User[];
  addUsersSearchHandleChange?: (event: FormEvent<HTMLInputElement>) => void;
};
