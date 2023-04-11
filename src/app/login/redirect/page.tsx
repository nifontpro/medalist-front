'use client'

import { useRouter, useSearchParams } from 'next/navigation'; //import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { authApi } from '@/auth/data/auth.api';
import { usePathname } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();
  const push = router.push;
  // const query = router.query; 
   const query = useSearchParams();
  // const pathname = router.pathname; 
    const pathname = usePathname();

  const [getLoginData] = authApi.useGetLoginDataMutation();

  const codeVerifier = localStorage.getItem('codeVerifier');

  const [info, setInfo] = useState('');

  useEffect(() => {
    const state = localStorage.getItem('state');
    const queryCode = query.get('code');

    if (queryCode == undefined) {
      return;
    }

    if (
      state != query.get('state') ||
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
    query,
    router,
  ]);

  return (
    <div className='flex flex-col m-2 text-3xl break-all'>
      <div>{info}</div>
    </div>
  );
};

export default RedirectPage;
