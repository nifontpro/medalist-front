import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticUsersAwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  departId: string;
};
