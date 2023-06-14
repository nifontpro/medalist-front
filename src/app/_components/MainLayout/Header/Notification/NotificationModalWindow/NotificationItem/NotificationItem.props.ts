import { UserMsg } from '@/domain/model/msg/UserMsg';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type NotificationItemProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  notification: UserMsg;
};
