import { UserMsg } from '@/types/msg/UserMsg';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type NotificationItemProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  notification: UserMsg;
};
