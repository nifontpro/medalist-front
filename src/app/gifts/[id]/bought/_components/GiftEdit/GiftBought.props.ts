import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type GiftBoughtProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
