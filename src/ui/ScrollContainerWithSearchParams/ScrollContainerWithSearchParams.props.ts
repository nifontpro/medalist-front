import { DetailedHTMLProps, FormEvent, HTMLAttributes } from 'react';

export type ScrollContainerWithSearchParamsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  searchHandleChange: (event: FormEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};
