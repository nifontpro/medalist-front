import { ResponseError } from '@/types/base/BaseResponse';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type NoAccessErrorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  errors?: ResponseError[];
};
