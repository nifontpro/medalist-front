'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/ui/Spinner/Spinner';
import { requestAuthCode } from './requestAuthCode';
import { generateState } from './generateState';

const LoginPage = () => {
  // https://github.com/crouchcd/pkce-challenge
  const pkceChallenge = require('pkce-challenge').default;

  useEffect(() => {
    const challenge = pkceChallenge(128);
    let tmpState = generateState(30);

    localStorage.setItem('codeVerifier', challenge.code_verifier);
    localStorage.setItem('codeChallenge', challenge.code_challenge);
    localStorage.setItem('state', tmpState);

    let url = requestAuthCode(tmpState, challenge.code_challenge);
    window.open(url, '_self');
    console.log('Redirect on RedirectPage');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col m-2'>
      <Spinner />
    </div>
  );
};

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});
