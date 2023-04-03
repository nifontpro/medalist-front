import { IUser } from '@/app/_model/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UsersProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: IUser[]
};
