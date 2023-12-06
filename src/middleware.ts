import { NextRequest, NextResponse } from 'next/server';
import {
  completeAuth,
  decodeToken,
  fetchAccessToken,
  handleExpiredToken,
  redirectToKeycloakAuth,
} from './fetch-token';

export async function middleware(request: NextRequest, response: NextResponse) {
  console.log('middleware');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/') && pathname !== '/error-page';
  const accessToken = request.cookies.get('access_token');

  if (isAuthPage && !accessToken) {
    console.log('Страница с правами и нет accessToken');
    return handleAuthPage(request);
  }

  if (!accessToken) {
    console.log('Нет accessToken');
    return redirectToKeycloakAuth(request, request.url);
  }

  const decoded = decodeToken(accessToken.value);
  if (!decoded) {
    console.log('Нет decoded');
    return redirectToKeycloakAuth(request, request.url);
  }

  if (decoded.exp < Date.now() / 1000) {
    console.log('Есть accessToken но он просрочен');
    return handleExpiredToken(request);
  }

  return NextResponse.next();
}

async function handleAuthPage(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const codeVerifier = request.cookies.get('codeVerifier');
  const origin = request.cookies.get('origin');

  if (!code) return redirectToKeycloakAuth(request, request.url);

  const token = await fetchAccessToken(
    code,
    codeVerifier?.value!,
    origin?.value!
  );

  return token ? completeAuth(request, token) : NextResponse.error();
}
