import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type WindowWithoutRolesProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  handleLogoutClick: () => Promise<void>;
};
