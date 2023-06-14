import { MotionProps } from 'framer-motion';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  RefAttributes,
  SetStateAction,
} from 'react';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { UserMsg } from '@/domain/model/msg/UserMsg';

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
