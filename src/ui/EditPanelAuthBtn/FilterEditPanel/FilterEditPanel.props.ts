import { PayCode } from '@/types/shop/pay/PayData';
import { MotionProps } from 'framer-motion';
import {
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
    deleteAsync: (id: number) => Promise<void>;
    handleReturn?: (id: number) => Promise<void>;
    getUrlEdit: (string?: string) => string;
    onlyRemove?: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    gift?: boolean;
    payCode?: PayCode;
  };
