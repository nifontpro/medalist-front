import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SingleGiftProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
