import { User } from '@/types/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type CountUsersPreviewProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users?: User[] | undefined;
  listUserVisible?: boolean;
  appearanceBtn: 'black' | 'white';
  totalUsers?: number;
};
