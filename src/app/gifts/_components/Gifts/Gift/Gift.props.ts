import { Award } from '@/types/award/Award';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type GiftProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Award;
};
