import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type GiftEditProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
