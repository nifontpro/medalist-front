import { useAppSelector } from '@/redux/hooks';
import Spinner from '@/ui/Spinner/Spinner';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';
import { authApi } from '../data/auth.api';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, loading } = useAppSelector((state) => state.auth);

  const { push } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isAuth === false && pathName !== '/login') {
      push('/login');
      // console.log('REDIRECT ON LOGIN');
    }
    // console.log(refresh);
  }, [isAuth, pathName, push]);

  return <>{children}</>;
};

export default AuthProvider;
