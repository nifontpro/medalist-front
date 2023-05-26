import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type MainNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
};
