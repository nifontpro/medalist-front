import { ResponseError } from '@/types/base/BaseResponse';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ServerErrorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  error: string;
};
