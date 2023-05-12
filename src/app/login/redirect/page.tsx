'use client';

import { useRouter, useSearchParams } from 'next/navigation'; //import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { authApi } from '@/api/auth/auth.api';
import { usePathname } from 'next/navigation';
import Spinner from '@/ui/Spinner/Spinner';
import { setCookie } from 'cookies-next';
import { isExpired, decodeToken } from "react-jwt";

const RedirectPage = () => {

  const { push, back } = useRouter();
  const query = useSearchParams();
  const pathname = usePathname();

  const [getLoginData, { isLoading }] = authApi.useGetLoginDataMutation();

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
        // setCookie('refresh_token', data.refresh_token, { maxAge: 60 }); // Для middleware
        setCookie('exp', decodeToken(data.refresh_token), ); // Для middleware
        await push('/');
        console.log('Redirect on Main');
      });
  }, [codeVerifier, getLoginData, pathname, query, push, back]);

  return (
    <>
      {/* <div className='flex flex-col m-2 text-3xl break-all'>
        <div>{info}</div>
      </div> */}
      <Spinner />
    </>
  );
};

export default RedirectPage;
