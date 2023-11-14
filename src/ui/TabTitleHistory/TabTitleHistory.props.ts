import { PayCode } from '@/types/shop/pay/PayData';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type TabTitleHistoryProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  onClickActive: PayCode;
  setPayCode: Dispatch<SetStateAction<PayCode>>;
  payCode: PayCode;
};
