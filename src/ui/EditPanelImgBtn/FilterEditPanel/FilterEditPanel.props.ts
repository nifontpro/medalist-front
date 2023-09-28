import { MotionProps } from 'framer-motion';
import {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
  SetStateAction,
} from 'react';

export type FilterEditPanelProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
    gallery: 'true' | 'false';
    setVisible: Dispatch<SetStateAction<boolean>>;
  };
