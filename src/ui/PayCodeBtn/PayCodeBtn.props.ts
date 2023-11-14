import { PayData } from '@/types/shop/pay/PayData';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PayCodeBtnProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  gift: PayData;
};
