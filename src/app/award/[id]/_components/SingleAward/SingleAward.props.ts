import { Activity } from '@/domain/model/award/Activity';
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SingleAwardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  awardActiv: Activity[] | null;
  award: AwardDetails | null;
};
