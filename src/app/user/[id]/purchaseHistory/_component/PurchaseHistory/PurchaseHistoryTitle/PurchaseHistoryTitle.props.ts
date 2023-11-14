import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PurchaseHistoryTitleProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
