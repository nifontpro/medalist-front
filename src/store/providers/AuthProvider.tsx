import { useAppSelector } from '@/store/hooks/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';
import { RootState } from '../storage/store';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, loading } = useAppSelector((state: RootState) => state.auth);

  const { push } = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!isAuth && pathName.slice(0, 6) !== '/login') {
      console.log(`AuthProvider: isAuth ${isAuth}`);
      push('/login');
      console.log('Redirect on LoginPage');
    }
  }, [isAuth, pathName, push]);

  return <>{children}</>;
};

export default AuthProvider;
