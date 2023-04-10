'use client';

import Spinner from '@/ui/Spinner/Spinner';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [refresh, { isLoading: loading, isError, isSuccess }] =
    refreshApi.useRefreshMutation();
  const { setAuthData } = useSetAuthData();

  const { push } = useRouter();

  useEffect(() => {
    const refreshToken = getRefreshCookie();
    console.log(refreshToken);
    if (!refreshToken) {
      push('/login');
      console.log('Redirect AuthComponent');
    }
    if (refreshToken) {
      refresh()
        .unwrap()
        .then(async (data) => {
          await setAuthData(data);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    <Spinner />;
  } else {
  }
  return <>{children}</>;
};

export default AuthProvider;
