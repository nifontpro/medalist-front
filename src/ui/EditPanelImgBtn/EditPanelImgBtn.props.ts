import { MotionProps } from 'framer-motion';
import {
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

export type EditPanelImgBtnProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    onChangeImages: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
    gallery: 'true' | 'false';
  };
