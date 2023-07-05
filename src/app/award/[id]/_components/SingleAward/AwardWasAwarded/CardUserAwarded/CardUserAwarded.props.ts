import { Activity } from '@/types/award/Activity';
import { AwardDetails } from '@/types/award/AwardDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserAwardedProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: Activity;
  award: AwardDetails | null;
};
