import { MotionProps } from 'framer-motion';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  RefAttributes,
  SetStateAction,
} from 'react';
import { BaseResponse } from '@/types/base/BaseResponse';
import { UserMsg } from '@/types/msg/UserMsg';

export type NotificationModalWindowProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    visibleModal: boolean;
    setVisibleModal: Dispatch<SetStateAction<boolean>>;
    message: BaseResponse<UserMsg[]> | undefined;
  };
