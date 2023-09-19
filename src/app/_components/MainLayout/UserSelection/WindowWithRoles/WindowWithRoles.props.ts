import { User } from '@/types/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type WindowWithRolesProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  handleLogoutClick: () => Promise<void>;
  rolesUser: User[];
  handleChangeRole: (role: User) => void;
};
