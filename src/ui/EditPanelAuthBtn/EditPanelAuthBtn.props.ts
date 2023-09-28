import { MotionProps } from 'framer-motion';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

export type EditPanelAuthBtnProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    handleRemove: (id: number) => Promise<void>;
    id: string;
    getUrlEdit: (string?: string) => string;
    onlyRemove: boolean;
    color?: 'white' | 'transparent';
  };
