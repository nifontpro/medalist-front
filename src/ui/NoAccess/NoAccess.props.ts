import { ResponseError } from '@/types/base/BaseResponse';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type NoAccessProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  button?: boolean;
  errors: ResponseError[] | undefined;
};
