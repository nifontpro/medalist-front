import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type MainUsersProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
};
