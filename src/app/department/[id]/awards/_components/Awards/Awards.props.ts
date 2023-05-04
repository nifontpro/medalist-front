import { Award } from '@/domain/model/award/Award';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AwardsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  awards: Award[];
  id: string;
};
