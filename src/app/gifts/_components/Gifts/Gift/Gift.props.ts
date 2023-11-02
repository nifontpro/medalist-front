import { Product } from '@/types/shop/product/Product';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type GiftProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Product;
};
