
import { User } from '@/domain/model/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AwardsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: User[]
  id: string
};
