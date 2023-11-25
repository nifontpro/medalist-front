import { PayCode } from '@/types/shop/pay/PayData';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type FilterHistoryProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  state: 'ASC' | 'DESC';
  setState: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  setPaycode: Dispatch<SetStateAction<PayCode>>;
  paycode: PayCode;
  setStartDateChange: (data: number) => void;
  setEndDateChange: (data: number) => void;
};
