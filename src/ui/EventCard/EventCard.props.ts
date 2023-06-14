import { BaseEvent, ShortEvent } from '@/domain/model/event/BaseEvent';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type EventCardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  event: BaseEvent | ShortEvent;
  remove: 'FALSE' | 'DEPT' | 'USER'
};
