import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type SingleUserEventProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  id: string;
};
