import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type TabTitleGiftsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  available: boolean;
  onClickActive: boolean;
  setAvailable: Dispatch<SetStateAction<boolean>>;
  setAvailableCount: Dispatch<SetStateAction<boolean>>;
};
