import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UserEditProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
