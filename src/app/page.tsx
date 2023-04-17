'use client'

import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/auth/auth.api';
import { userApi } from '@/api/user/user.api';
import { IPayload } from '@/domain/model/base/idToken';
import { authActions } from '@/store/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useJwt } from 'react-jwt';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  function logoutWin(it: string) {
    console.log(it);

    const params = [
      'post_logout_redirect_uri=' + APP_URI,
      'id_token=' + it,
      'client_id=' + CLIENT_ID,
    ];

    const url = KEYCLOAK_URI + '/logout' + '?' + params.join('&');
    window.open(url, '_self');
  }

  const { push } = useRouter();
  const { isAuth, idToken, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { decodedToken, isExpired } = useJwt(idToken || '');
  const payload = decodedToken as IPayload | undefined;

  const { data: getInfo } = userApi.useGetTestDataQuery(undefined, {
    skip: !isAuth,
  });

  const logoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const it = localStorage.getItem('it');
    if (it != undefined && !isExpired) {
      logoutWin(it);
    }
    await dispatch(authActions.setNoAccess());
    // await push("/login")
  };

  const loginHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await push('/login');
  };

  return (
    // <div className='flex flex-col m-2 break-all'>Главная страница</div>;
    <div className='flex flex-col m-2 break-all'>
      <div className='text-red-700'>
        KEYCLOAK_URL: {process.env.KEYCLOAK_URL}
      </div>
      <div className='text-green-700'>APP_URL: {process.env.APP_URL}</div>
      <div className='text-blue-700'>
        API_SERVER_URL: {process.env.API_SERVER_URL}
      </div>

      <div className='text-cyan-700'>
        {isAuth ? <>Вход выполнен</> : <>Вход не выполнен</>}
      </div>
      <div className='text-red-700'>Info from client: {getInfo?.res}</div>
      <button onClick={loginHandler} className='m-3 border-2 text-green-700'>
        Login
      </button>
      <button onClick={logoutHandler} className='m-3 border-2 text-red-700'>
        Logout
      </button>
      <div className='text-blue-700'>name: {payload?.name}</div>
      <div className='text-green-700'>email: {payload?.email}</div>
      <div className='text-blue-600'>{accessToken}</div>
    </div>
  );
}
