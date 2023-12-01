import { RoleUser } from '@/types/user/user';
import { FC, PropsWithChildren, memo, useCallback } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../storage/store';
import { checkRole } from '@/utils/checkRole';

const AuthComponent: FC<
  PropsWithChildren<{ minRole: RoleUser; access?: boolean }>
> = ({ children, minRole, access }) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  return checkRole(typeOfUser, minRole) || access ? <>{children}</> : null;
};

export default memo(AuthComponent);
