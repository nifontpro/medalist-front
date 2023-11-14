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
  setPayCode: Dispatch<SetStateAction<PayCode>>;
  payCode: PayCode;
  setStartDateChange: (data: number) => void;
  setEndDateChange: (data: number) => void;
};
