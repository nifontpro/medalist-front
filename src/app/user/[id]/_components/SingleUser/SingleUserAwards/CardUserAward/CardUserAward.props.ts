import { Activity } from '@/types/award/Activity';
import { UserDetails } from '@/types/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserAwardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Activity;
  user: UserDetails | undefined;
};
