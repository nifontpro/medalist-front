import { AwardDetails } from '@/types/award/AwardDetails';
import { ProductDetails } from '@/types/shop/product/ProductDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type SingleGiftTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  gift: ProductDetails;
};
