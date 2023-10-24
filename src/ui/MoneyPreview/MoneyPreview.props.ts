import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type MoneyPreviewProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  value: number;
  currency: string;
  color?: 'gray' | 'white' | 'gray96' | 'black' | 'graySilver';
};
