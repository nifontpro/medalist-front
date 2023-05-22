import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AwardsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
