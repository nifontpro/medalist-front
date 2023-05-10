import { Activity } from '@/domain/model/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeUserProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  userId: string;
  award: Activity;
};
