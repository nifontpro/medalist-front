import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticActivityProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  departId: string;
};
