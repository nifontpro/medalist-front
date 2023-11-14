import { PayData } from '@/types/shop/pay/PayData';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type PurchaseHistoryCardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  gift: PayData;
};
