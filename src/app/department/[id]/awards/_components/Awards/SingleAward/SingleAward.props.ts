import { Award } from '@/domain/model/award/Award';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type SingleAwardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Award;
};
