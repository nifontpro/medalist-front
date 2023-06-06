import {
  AUTH_CODE_REDIRECT_URI,
  CLIENT_ID,
  KEYCLOAK_URI,
} from '@/api/auth/auth.api';

export function requestAuthCode(state: string, codeChallenge: string): string {
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
