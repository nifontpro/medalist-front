import { ActionType, Activity } from '@/types/award/Activity';
import { Product } from '@/types/shop/product/Product';
import { UserDetails } from '@/types/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserGiftProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: UserDetails | undefined;
  gift: Product;
};
