import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import plus from './plus.svg';
import down from './down.svg';
import dots from './dots.svg';
import right from './right.svg';
import settings from './setting.svg';

export const icons = {
  plus,
  down,
  dots,
  right,
  settings,
};

export type IconName = keyof typeof icons;

export type ButtonCircleIconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  appearance: 'black' | 'transparent' | 'white';
  icon: IconName;
  children?: ReactNode;
  disabled?: boolean;
  classNameForIcon: string;
};
