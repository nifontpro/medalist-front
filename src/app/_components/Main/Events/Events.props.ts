
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type EventsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
};
