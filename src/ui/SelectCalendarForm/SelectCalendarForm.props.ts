import type { Dayjs } from 'dayjs';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export type SelectCalendarFormProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
  error?: FieldError | undefined;
  handleChangeDate: (value: string | null) => void;
  handleClearDate?: (value: string | null) => void;
  value?: Dayjs;
};
