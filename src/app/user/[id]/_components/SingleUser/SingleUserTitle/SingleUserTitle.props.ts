import { Activity } from '@/types/award/Activity';
import { BaseResponse } from '@/types/base/BaseResponse';
import { UserPay } from '@/types/shop/pay/UserPay';
import { UserDetails } from '@/types/user/userDetails';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';

export type SingleUserTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: UserDetails | undefined;
  userActiv: Activity[] | undefined;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  refOpen: MutableRefObject<null>;
  setVisibleModalEvent: Dispatch<SetStateAction<boolean>>;
  moneyUser: BaseResponse<UserPay> | undefined;
};
