import { Award } from '@/types/award/Award';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PreviewDeptProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Award;
  list: boolean;
};
