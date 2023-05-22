import { Activity } from '@/domain/model/award/Activity';
import { UserDetails } from '@/domain/model/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserAwardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Activity;
  user: UserDetails | undefined;
};
