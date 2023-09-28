import { AwardState } from '@/types/award/Award';
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
  onClickActive: SetStateAction<AwardState | undefined>;
  active: AwardState | undefined;
  setActive: Dispatch<SetStateAction<AwardState | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
  count?: number;
};
