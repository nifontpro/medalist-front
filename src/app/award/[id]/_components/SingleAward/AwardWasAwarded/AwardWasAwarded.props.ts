import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type AwardWasAwardedProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: AwardDetails | null;
  awardActiv: Activity[] | null;
};
