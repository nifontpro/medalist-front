import { Award } from '@/types/award/Award';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type AwardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Award;
};
