import { PayCode } from '@/types/shop/pay/PayData';
import { MotionProps } from 'framer-motion';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

export type EditPanelProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean;
    deleteAsync: (id: number) => Promise<void>;
    handleReturn?: (id: number) => Promise<void>;
    getUrlEdit: (string?: string) => string;
    onlyRemove?: boolean;
    gift?: boolean;
    payCode?: PayCode;
  };
