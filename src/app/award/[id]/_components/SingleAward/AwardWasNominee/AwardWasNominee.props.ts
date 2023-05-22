import { Activity } from '@/domain/model/award/Activity';
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type AwardWasNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: AwardDetails | null;
  awardActiv: Activity[] | null;
};
