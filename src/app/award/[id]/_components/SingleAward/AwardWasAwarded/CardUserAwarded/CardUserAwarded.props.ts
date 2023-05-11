import { Activity } from '@/domain/model/award/Activity';
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserAwardedProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: Activity;
  award: AwardDetails | null;
};