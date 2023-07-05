import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type EventSingleUserProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  id: string;
};
