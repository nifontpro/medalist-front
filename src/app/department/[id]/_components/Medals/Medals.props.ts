import { IUser } from '@/app/user/_model/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type MedalsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string
};
