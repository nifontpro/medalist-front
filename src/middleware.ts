import { NextRequest, NextResponse } from 'next/server';
// import pkceChallenge from 'pkce-challenge';
// import {
//   AUTH_CODE_REDIRECT_URI,
//   CLIENT_ID,
//   KEYCLOAK_URI,
// } from './api/auth/auth.api';

export async function middleware(req: NextRequest, res: NextResponse) {
  //   const generateState = (length: number) => {
  //     let state = '';
  //     // noinspection SpellCheckingInspection
  //     let alphaNumericCharacters =
  //       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     let alphaNumericCharactersLength = alphaNumericCharacters.length;
  //     for (let i = 0; i < length; i++) {
  //       state += alphaNumericCharacters.charAt(
  //         Math.floor(Math.random() * alphaNumericCharactersLength)
  //       );
  //     }
 
  //     return state;
  //   };

  //   function requestAuthCode(state: string, codeChallenge: string): string {
  //     const params = [
  //       'response_type=code',
  //       'state=' + state,
  //       'client_id=' + CLIENT_ID,
  //       'scope=openid',
  //       'code_challenge=' + codeChallenge,
  //       'code_challenge_method=S256',
  //       'redirect_uri=' + AUTH_CODE_REDIRECT_URI,
  //     ];

  //     return KEYCLOAK_URI + '/auth' + '?' + params.join('&');
  //   }
  const { pathname, origin } = req.nextUrl;

  const exp = req.cookies.get('exp')?.value; // жизнь токена полученного
  const currentDate = +new Date();

  //   let tmpState = generateState(30);
  //   const challenge = pkceChallenge(128);
  //   let url = requestAuthCode(tmpState, challenge.code_challenge);

  if (
    pathname == '/' ||
    pathname.startsWith('/award') ||
    pathname.startsWith('/department') ||
    pathname.startsWith('/user') ||
    pathname.startsWith('/create')
  ) {
    if (!exp || Number(exp) * 1000 < currentDate)
      return NextResponse.redirect(`${process.env.APP_URL}/login?redirect=${pathname}`);
    //   return NextResponse.redirect(`${url}`);
  }
  if (pathname == '/login' && exp) {
    return NextResponse.redirect(`${origin}`);
  }
}
