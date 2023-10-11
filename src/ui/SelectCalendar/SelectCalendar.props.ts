import { Dayjs } from 'dayjs';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export type SelectCalendarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
  error?: FieldError | undefined;
  handleChangeDate: (value: string | null) => void;
  handleClearDate?: (value: string | null) => void;
  value?: string | null;
};
