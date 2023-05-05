import { SortAwardsType } from '@/app/department/[id]/awards/_components/Awards/useAwards';
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
  onClickActive: SetStateAction<SortAwardsType>;
  active: SortAwardsType;
  setActive: Dispatch<SetStateAction<SortAwardsType>>;
};
