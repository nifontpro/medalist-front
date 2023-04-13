'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedTreeId, setArrayIds } from '../Sidebar/sidebarTree.slice';
import { useRouter } from 'next/navigation';
import { useJwt } from 'react-jwt';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/app/_auth/data/data.api';
import { IPayload } from '@/app/_resource/model/idToken';
import { resourceApi } from '@/app/_resource/data/resource.api';
import { authActions } from '@/app/_auth/data/auth.slice';


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

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { isAuth, idToken } = useAppSelector((state) => state.auth);
  const { push } = useRouter();
  const { decodedToken, isExpired } = useJwt(idToken || '');
  const payload = decodedToken as IPayload | undefined;

  const { data: getInfo } = resourceApi.useGetTestDataQuery(undefined, {
    skip: !isAuth,
  });

  const handleLogoutClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const it = localStorage.getItem('it');
    if (it != undefined && !isExpired) {
      logoutWin(it);
      dispatch(setSelectedTreeId('0'))
      dispatch(setArrayIds(['0']))
    }
    await dispatch(authActions.setNoAccess());
    console.log('не понятно что это')
    // await push("/login")
  };

  const handleLoginClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await push('/login');
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link
        href='/'
        className={styles.logo}
        onClick={() => dispatch(setSelectedTreeId('0'))}
      >
        <LogoIcon className='w-[200px]' />
      </Link>
      <ul className={styles.sign}>{isAuth ? 
      (<button onClick={handleLogoutClick}>Выход</button>)
       : 
       (<button onClick={handleLoginClick}>Вход</button>)
       }</ul>
    </div>
  );
};



export default Header;
