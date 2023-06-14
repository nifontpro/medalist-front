
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type EventDepartmentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  id: string
};
