import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type ActivityProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
};
