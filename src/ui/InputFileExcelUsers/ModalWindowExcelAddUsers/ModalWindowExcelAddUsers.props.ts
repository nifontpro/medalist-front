import { MotionProps } from 'framer-motion';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  RefAttributes,
  SetStateAction,
} from 'react';
import { DataSheets } from '../inputExls.types';
import { DeptDetails } from '@/types/dept/deptDetails';

export type ModalWindowExcelAddUsersProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    visibleModal: boolean;
    setVisibleModal: Dispatch<SetStateAction<boolean>>;
    textBtn: string;
    data: DataSheets[] | null;
    setData: Dispatch<SetStateAction<DataSheets[] | null>>;
    fileName: string;
    department: DeptDetails;
    handleClearInput: () => void;
  };
