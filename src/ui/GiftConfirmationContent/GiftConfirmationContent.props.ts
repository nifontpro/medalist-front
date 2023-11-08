import { Product } from '@/types/shop/product/Product';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type GiftConfirmationContentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  gift: Product;
};
