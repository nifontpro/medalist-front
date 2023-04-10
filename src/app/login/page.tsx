'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  AUTH_CODE_REDIRECT_URI,
  CLIENT_ID,
  KEYCLOAK_URI,
} from '@/app/_auth/data/auth.api';

const LoginPage = () => {
  useEffect(() => {
    const challenge = pkceChallenge(128);
    let tmpState = generateState(30);

    localStorage.setItem('codeVerifier', challenge.code_verifier);
    localStorage.setItem('codeChallenge', challenge.code_challenge);
    localStorage.setItem('state', tmpState);

    let url = requestAuthCode(tmpState, challenge.code_challenge);
    window.open(url, '_self');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateState = (length: number) => {
    let state = '';
    // noinspection SpellCheckingInspection
    let alphaNumericCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alphaNumericCharactersLength = alphaNumericCharacters.length;
    for (let i = 0; i < length; i++) {
      state += alphaNumericCharacters.charAt(
        Math.floor(Math.random() * alphaNumericCharactersLength)
      );
    }

    return state;
  };

  function requestAuthCode(state: string, codeChallenge: string): string {
    const params = [
      'response_type=code',
      'state=' + state,
      'client_id=' + CLIENT_ID,
      'scope=openid',
      'code_challenge=' + codeChallenge,
      'code_challenge_method=S256',
      'redirect_uri=' + AUTH_CODE_REDIRECT_URI,
    ];

    return KEYCLOAK_URI + '/auth' + '?' + params.join('&');
  }

  // https://github.com/crouchcd/pkce-challenge
  const pkceChallenge = require('pkce-challenge').default;

  return (
    <div className='flex flex-col m-2'>
      <div className='text-green-700'>Login...</div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});
