import { useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, loading } = useAppSelector((state) => state.auth);

  const { push } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isAuth === false && pathName !== '/login') {
      push('/login');
    }
  }, [isAuth, pathName, push]);

  return <>{children}</>;
};

export default AuthProvider;
