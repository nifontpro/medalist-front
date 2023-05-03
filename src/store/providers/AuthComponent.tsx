import { RoleUser, User } from '@/domain/model/user/user';
import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { RootState } from '../storage/store';

const AuthComponent: FC<PropsWithChildren<{ minRole: RoleUser }>> = ({
  children,
  minRole,
}) => {
  const { typeOfUser } = useAppSelector((state: RootState) => state.userSelection);

  const checkRole = (typeOfUser: User | undefined, minRole: RoleUser) => {
    let access: boolean = false
    typeOfUser?.roles.forEach((role) => {
      if (role == minRole) {
        access = true
      }
    })
    return access
  }

  return checkRole(typeOfUser, minRole) ? <>{children}</> : null;
};

export default AuthComponent;
