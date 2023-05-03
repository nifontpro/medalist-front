import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export type TabTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  count: number;
  onClickActive: SetStateAction<'' | 'SIMPLE' | 'NOMINEE' | 'UNDEF'>;
  active: '' | 'SIMPLE' | 'NOMINEE' | 'UNDEF';
  setActive: Dispatch<SetStateAction<'' | 'SIMPLE' | 'NOMINEE' | 'UNDEF'>>;
};
