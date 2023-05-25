import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  departId: string
};
