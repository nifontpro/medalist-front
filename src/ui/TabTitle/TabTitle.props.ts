import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

export type TabTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  children?: ReactNode;
  count: number;
  onClickActive: SetStateAction<'' | 'PERIOD' | 'SIMPLE' | 'UNDEF'>;
  active: '' | 'PERIOD' | 'SIMPLE' | 'UNDEF';
  setActive: Dispatch<SetStateAction<'' | 'PERIOD' | 'SIMPLE' | 'UNDEF'>>;
};
