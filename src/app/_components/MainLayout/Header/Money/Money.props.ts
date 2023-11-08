import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type MoneyProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  value?: number;
  currency: string;
};
