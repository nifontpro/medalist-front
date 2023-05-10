
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UsersProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string
};
