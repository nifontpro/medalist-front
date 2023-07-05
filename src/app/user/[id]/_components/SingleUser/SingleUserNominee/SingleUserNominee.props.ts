import { Activity } from '@/types/award/Activity';
import { UserDetails } from '@/types/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type SingleUserNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: UserDetails | undefined;
  userActiv: Activity[] | undefined;
};
