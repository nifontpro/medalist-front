import { ProductDetails } from '@/types/shop/product/ProductDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type SingleGiftGetProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  gift: ProductDetails;
};
