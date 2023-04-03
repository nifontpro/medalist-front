import { IUser } from '@/app/_model/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type StatisticProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string
};
