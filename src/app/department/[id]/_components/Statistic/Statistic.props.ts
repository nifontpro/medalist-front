import { IUser } from '@/app/user/_model/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type StatisticProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string
};
