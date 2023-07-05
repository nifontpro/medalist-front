import { Activity } from '@/types/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeUserProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  userId: string;
  award: Activity;
};
