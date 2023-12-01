import { NextRequest, NextResponse } from 'next/server';
import {
  completeAuth,
  decodeToken,
  fetchAccessToken,
  handleExpiredToken,
  redirectToKeycloakAuth,
} from './fetch-token';

export async function middleware(request: NextRequest, res: NextResponse) {
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/');
  const accessToken = request.cookies.get('access_token');

  if (isAuthPage && !accessToken) {
    return handleAuthPage(request);
  }

  if (!accessToken) return redirectToKeycloakAuth(request, request.url);

  const decoded = decodeToken(accessToken.value);
  if (!decoded) return redirectToKeycloakAuth(request, request.url);

  if (decoded.exp < Date.now() / 1000) {
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
