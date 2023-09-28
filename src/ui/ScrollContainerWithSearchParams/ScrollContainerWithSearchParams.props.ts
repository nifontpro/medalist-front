import {
  DetailedHTMLProps,
  Dispatch,
  FormEvent,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export type ScrollContainerWithSearchParamsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  search: boolean;
  searchHandleChange?: (event: FormEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  setEndDateChange?: (data: number) => void;
  setStartDateChange?: (data: number) => void;
  state?: 'ASC' | 'DESC';
  setState?: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
};
