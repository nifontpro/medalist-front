import { Activity } from '@/domain/model/award/Activity';
import { UserDetails } from '@/domain/model/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type SingleUserNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: UserDetails | undefined;
  userActiv: Activity[] | undefined;
};
