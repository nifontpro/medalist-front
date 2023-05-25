import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticCountNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  departId: string;
};
