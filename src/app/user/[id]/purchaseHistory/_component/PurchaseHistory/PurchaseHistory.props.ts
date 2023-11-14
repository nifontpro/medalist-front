import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PurchaseHistoryProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
