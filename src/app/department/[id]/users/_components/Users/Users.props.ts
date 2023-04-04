import { IUser } from '@/app/user/_model/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UsersProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: IUser[]
  id: string
};
