
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type TitleSingleDepartmentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  id: string
};
