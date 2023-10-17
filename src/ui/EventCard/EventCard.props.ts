import { BaseEvent, EventType, ShortEvent } from '@/types/event/BaseEvent';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type EventCardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  event: BaseEvent | ShortEvent;
  remove: 'FALSE' | 'DEPT' | 'USER';
  eventType?: EventType;
};
