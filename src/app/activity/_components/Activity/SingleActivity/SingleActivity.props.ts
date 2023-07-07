import { Activity } from '@/types/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type SingleActivityProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  activity: Activity;
};
