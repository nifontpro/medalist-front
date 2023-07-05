import { User } from '@/types/user/user';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export type UserListChoiceUsersProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  allChecked: boolean;
  user: User;
  setVisibleCheckbox: Dispatch<SetStateAction<boolean>>;
  setArrChoiceUser: Dispatch<SetStateAction<string[]>>;
  arrChoiceUser: string[];
};
