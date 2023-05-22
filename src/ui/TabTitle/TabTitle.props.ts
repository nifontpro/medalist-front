import { AwardState } from '@/domain/model/award/Award';
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
  onClickActive: SetStateAction<AwardState | undefined>;
  active: AwardState | undefined;
  setActive: Dispatch<SetStateAction<AwardState | undefined>>;
  setPage: Dispatch<SetStateAction<number>>
};
