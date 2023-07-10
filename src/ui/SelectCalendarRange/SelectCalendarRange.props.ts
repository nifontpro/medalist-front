import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SelectCalendarRangeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  setStartDateChange: (data: number) => void;
  setEndDateChange: (data: number) => void;
};
