import { RoleUser, User } from '@/types/user/user';
import { FC, PropsWithChildren, memo } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../storage/store';
import { checkRole } from '@/utils/checkRole';

const AuthComponent: FC<PropsWithChildren<{ minRole: RoleUser }>> = ({
  children,
  minRole,
}) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  return checkRole(typeOfUser, minRole) ? <>{children}</> : null;
};

export default memo(AuthComponent)
