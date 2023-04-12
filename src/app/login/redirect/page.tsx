'use client';

import { useRouter, useSearchParams } from 'next/navigation'; //import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { authApi } from '@/app/_auth/data/auth.api';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { authActions } from '@/app/_auth/data/auth.slice';
import Spinner from '@/ui/Spinner/Spinner';

const RedirectPage = () => {
  const dispatch = useAppDispatch();
  const { push, back } = useRouter();
  // const query = router.query;
  const query = useSearchParams();
  // const pathname = router.pathname;
  const pathname = usePathname();

  const [getLoginData, { isLoading }] = authApi.useGetLoginDataMutation();
  // useEffect(() => {
  //   dispatch(authActions.setLoading(isLoading));
  // }, [isLoading, dispatch]);

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
      .then(async (data) => {
        // console.log(data)
        await push('/');
      });
  }, [codeVerifier, getLoginData, pathname, query, push, back]);

  return (
    <Spinner />
    // <div className='flex flex-col m-2 text-3xl break-all'>
    //   <div>{info}</div>
    // </div>
  );
};

export default RedirectPage;
