import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticCountAwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  departId: string;
};
