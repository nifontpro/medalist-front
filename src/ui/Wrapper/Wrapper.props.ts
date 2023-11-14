import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type WrapperProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
};
