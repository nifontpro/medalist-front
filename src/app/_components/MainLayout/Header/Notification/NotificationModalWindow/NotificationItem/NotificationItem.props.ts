import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IMessage } from '../../Notification.props';

export type NotificationItemProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  notification: IMessage;
};
