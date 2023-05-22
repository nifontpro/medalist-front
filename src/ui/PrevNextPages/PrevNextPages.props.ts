import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PrevNextPagesProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  startPage: number;
  endPage: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
};
