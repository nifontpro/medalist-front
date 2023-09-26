import { User } from '@/types/user/user';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export type UserListRatingProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  currentRank: number;
  children?: ReactNode;
  users: User[] | undefined;
  withoutCountAwards: boolean;
  page?: number;
  pageSize?: number;
};
