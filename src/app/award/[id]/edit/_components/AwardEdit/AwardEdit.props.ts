import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AwardEditProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string;
};
