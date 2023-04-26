import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type DepartmentEditProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
