import { NextRequest, NextResponse } from 'next/server';
import { generateState } from './app/_login/generateState';
import { AUTH_CODE_REDIRECT_URI } from './api/auth/auth.api';

export type Token = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
};

export type AccessTokenDecoded = {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  groups: string[];
  preferred_username: string;
  userPrincipalName: string;
};

const pkceChallenge = require('pkce-challenge').default;
const challenge = pkceChallenge(128);
const tmpState = generateState(30);

const keycloakUrl = process.env.KEYCLOAK_URL || 'https://md-auth.ru';
const client_id = process.env.KEYCLOAK_CLIENT_ID || 'medalist-client';
const redirect_uri = process.env.APP_URL ? process.env.APP_URL : '/';
const client_secret = process.env.KEYCLOAK_CLIENT_SECRET || '';
const realm = process.env.KEYCLOAK_REALM || 'medalist-realm';
const grant_type = 'authorization_code';

export const fetchAccessToken = async (
  code: string,
  codeVerifier: string,
  origin: string
) => {
  // console.log('fetchAccessToken');
  // console.log('fetchAccessToken redirect_uri', redirect_uri);
  // console.log('fetchAccessToken codeVerifier', codeVerifier);
  // console.log('fetchAccessToken code', code);
  try {
    const response = await fetch(
      `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          grant_type,
          client_id,
          redirect_uri: origin,
          code_verifier: codeVerifier,
        }),
      }
    );
    const data: Token = await response.json();
    return data;
  } catch (error) {
    console.log('error fetchAccessToken', error);
    return null;
  }
};

export const refreshAccessToken = async (refresh_token: string) => {
  // console.log('refreshAccessToken');
  try {
    const response = await fetch(
      `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id,
          refresh_token,
        }),
      }
    );
    const data: Token = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function handleExpiredToken(request: NextRequest) {
  // console.log('handleExpiredToken');

  const refreshToken = request.cookies.get('refresh_token');
  if (!refreshToken) return redirectToKeycloakAuth(request, request.url);

  const decoded = decodeToken(refreshToken.value);
  if (!decoded || decoded.exp < Date.now() / 1000)
    return redirectToKeycloakAuth(request, request.url);

  const newToken = await refreshAccessToken(refreshToken.value);
  return newToken ? completeAuth(request, newToken) : NextResponse.error();
}

export function decodeToken(token: string): AccessTokenDecoded | null {
  // console.log('decodeToken', token);
  try {
    const payload = token.split('.')[1];
    return payload ? JSON.parse(atob(payload)) : null;
  } catch (error) {
    return null;
  }
}

export function completeAuth(request: NextRequest, token: Token) {
  // console.log('completeAuth');
  const url = request.cookies.get('origin');

  // const state = request.nextUrl.searchParams.get('state');
  // const url = `${request.nextUrl.origin}${state || request.nextUrl}`;
  // console.log('completeAuth url', url);

  const response = NextResponse.redirect(url?.value!);
  // Delete existing tokens if they exist
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  // // Set new tokens
  response.cookies.set('access_token', token.access_token);
  response.cookies.set('refresh_token', token.refresh_token);

  return response;
}

export function redirectToKeycloakAuth(request: NextRequest, origin: string) {
  // console.log('redirectToKeycloakAuth');
  const authUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth`;

  const params = [
    'response_type=code',
    'state=' + tmpState,
    'client_id=' + client_id,
    'scope=openid',
    'code_challenge=' + challenge.code_challenge,
    'code_challenge_method=S256',
    'redirect_uri=' + origin,
  ];
  const response = NextResponse.redirect(
    new URL(`${authUrl}?${params.join('&')}`)
  );
  response.cookies.set('state', tmpState);
  response.cookies.set('codeVerifier', challenge.code_verifier);
  response.cookies.set('codeChallenge', challenge.code_challenge);
  response.cookies.set('origin', origin);

  return response;
}

// https://md-auth.ru/realms/medalist-realm/protocol/openid-connect/auth?response_type=code&state=jC80SmcbuVl5s3rr8ddRL5k5JKHhiy&client_id=medalist-client&scope=openid&code_challenge=C0W_GEfvc0Ej9Jm2gsRfWoUdKoLqemqJcIjz3Y0aNj8&code_challenge_method=S256&redirect_uri=http://localhost:3000/
