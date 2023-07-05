import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SingleAwardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  awardActiv: Activity[] | null;
  award: AwardDetails | null;
};
