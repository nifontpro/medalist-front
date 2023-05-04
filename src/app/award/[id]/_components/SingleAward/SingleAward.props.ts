import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SingleAwardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: AwardDetails | null;
};
