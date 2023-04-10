import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { authApi } from '@/app/_auth/data/auth.api';

const RedirectPage = () => {
  const router = useRouter();
  const push = router.push;
  const query = router.query;
  const pathname = router.pathname;

  const [getLoginData] = authApi.useGetLoginDataMutation();

  const codeVerifier = localStorage.getItem('codeVerifier');

  const [info, setInfo] = useState('');

  useEffect(() => {
    const state = localStorage.getItem('state');
    const queryCode = query.code;

    if (queryCode == undefined) {
      return;
    }

    if (
      state != query.state ||
      codeVerifier == null ||
      typeof queryCode != 'string'
    ) {
      setInfo('Invalid grant!');
      return;
    }

    setInfo('Get login data...');
    getLoginData({ code: queryCode, codeVerifier })
      .unwrap()
      .then(async () => {
        await push('/');
      });
  }, [
    codeVerifier,
    getLoginData,
    pathname,
    push,
    query.code,
    query.state,
    router,
  ]);

  return (
    <div className='flex flex-col m-2 text-3xl break-all'>
      <div>{info}</div>
    </div>
  );
};

export default RedirectPage;
