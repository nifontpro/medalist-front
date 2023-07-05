import { Activity } from '@/types/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: Activity;
  awardId: number;
};
