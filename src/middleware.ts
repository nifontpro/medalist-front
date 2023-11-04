import { NextRequest, NextResponse } from 'next/server';
import {
  completeAuth,
  decodeToken,
  fetchAccessToken,
  handleExpiredToken,
  redirectToKeycloakAuth,
} from './fetch-token';
import { Url } from 'url';

// export async function middleware(req: NextRequest, res: NextResponse) {
//   const { pathname, origin } = req.nextUrl;

//   const exp = req.cookies.get('exp')?.value; // жизнь токена полученного
//   const currentDate = +new Date();

//   if (
//     pathname == '/' ||
//     pathname.startsWith('/award') ||
//     pathname.startsWith('/department') ||
//     pathname.startsWith('/user') ||
//     pathname.startsWith('/create') ||
//     pathname.startsWith('/gifts')
//   ) {
//     if (!exp || Number(exp) * 1000 < currentDate)
//       return NextResponse.redirect(
//         `${process.env.APP_URL}/login?redirect=${pathname}`
//       );
//   }
//   if (pathname == '/login' && exp) {
//     return NextResponse.redirect(`${origin}`);
//   }
// }

export async function middleware(request: NextRequest, res: NextResponse) {
  const { pathname, origin } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/');
  // const isAnotherPage =
  //   pathname == '/' ||
  //   pathname.startsWith('/award') ||
  //   pathname.startsWith('/department') ||
  //   pathname.startsWith('/user') ||
  //   pathname.startsWith('/create') ||
  //   pathname.startsWith('/gifts');
  const accessToken = request.cookies.get('access_token');

  if (isAuthPage && !accessToken) {
    // console.log('isAuthPage');
    return handleAuthPage(request);
  }

  // const accessToken = request.cookies.get('access_token');
  if (!accessToken) return redirectToKeycloakAuth(request, request.url);

  const decoded = decodeToken(accessToken.value);
  // console.log('decoded', decoded);
  if (!decoded) return redirectToKeycloakAuth(request, request.url);
  console.log('decoded', decoded);

  // if (isAnotherPage && !decoded.groups.includes('GenDoc_Admin')) {
  //   return NextResponse.error(); // Admin-only access
  // }

  if (decoded.exp < Date.now() / 1000) {
    return handleExpiredToken(request);
  }

  return NextResponse.next();
}

async function handleAuthPage(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const codeVerifier = request.cookies.get('codeVerifier');
  const origin = request.cookies.get('origin');

  // console.log('Code', code);
  // console.log('codeVerifier', codeVerifier);
  // console.log(request.url);

  if (!code)
    // {
    return redirectToKeycloakAuth(request, request.url);
  // } else {
  //   console.log('code', code);
  // }

  const token = await fetchAccessToken(
    code,
    codeVerifier?.value!,
    origin?.value!
  );

  // console.log('token', token);
  return token ? completeAuth(request, token) : NextResponse.error();
}
