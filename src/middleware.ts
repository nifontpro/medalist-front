import { NextRequest, NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// paths that require authentication or authorization
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    const access_token: string = token.accessToken as string;
    const refresh_token: string = token.refreshToken as string;
    const accessTokenExpired: string = (
      token.accessTokenExpired as number
    ).toString();
    const refreshTokenExpired: string = (
      token.refreshTokenExpired as number
    ).toString();
    const id_token: string = token.sub as string;

    res.cookies.set('id_token', id_token);
    res.cookies.set('accessToken', access_token);
    res.cookies.set('refreshToken', refresh_token);
    res.cookies.set('accessTokenExpired', accessTokenExpired);
    res.cookies.set('refreshTokenExpired', refreshTokenExpired);

    console.log(token)

    const currentDate = +new Date();
    if (
      pathname == '/' ||
      pathname.startsWith('/award') ||
      pathname.startsWith('/department') ||
      pathname.startsWith('/user') ||
      pathname.startsWith('/create')
    ) {
      if (!accessTokenExpired || Number(accessTokenExpired) < currentDate) {
        return NextResponse.redirect(`${process.env.APP_URL}/api/auth/signin`);
      }
    }
  }

  return res;
}

// export const config = {matcher: ['/', '/create/owner']}

// export async function middleware(req: NextRequest, res: NextResponse) {
//   const { pathname, origin } = req.nextUrl;
//   const exp = req.cookies.get('exp')?.value; // жизнь токена полученного
//   const currentDate = +new Date();

//   if (
//     pathname == '/' ||
//     pathname.startsWith('/award') ||
//     pathname.startsWith('/department') ||
//     pathname.startsWith('/user') ||
//     pathname.startsWith('/create')
//   ) {
//     if (!exp || Number(exp) * 1000 < currentDate)
//       return NextResponse.redirect(`${process.env.APP_URL}/api/auth/signin`);
//     //   return NextResponse.redirect(`${url}`);
//   }
//   if (pathname == '/login' && exp) {
//     return NextResponse.redirect(`${origin}`);
//   }
// }
