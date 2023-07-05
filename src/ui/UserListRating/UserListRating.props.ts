import { User } from '@/types/user/user';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type UserListRatingProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  users: User[] | undefined;
  withoutCountAwards: boolean;
  page?: number
  pageSize?: number
};
