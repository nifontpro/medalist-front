import { Activity } from '@/domain/model/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: Activity;
  awardId: number;
};
