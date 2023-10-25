import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type GiftsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
