import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SingleAwardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
