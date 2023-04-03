import { IUser } from '@/app/_model/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type MedalsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string
};
