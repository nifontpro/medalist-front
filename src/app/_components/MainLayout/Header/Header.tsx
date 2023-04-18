'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  setSelectedTreeId,
  setArrayIds,
} from '../../../../store/features/sidebar/sidebarTree.slice';
import { useRouter } from 'next/navigation';
import { useJwt } from 'react-jwt';
import { authActions } from '@/store/features/auth/auth.slice';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/auth/auth.api';
import {
  setIsOpen,
  setTypeOfUserUndefined,
} from '@/store/features/userSelection/userSelection.slice';
import { RootState } from '@/store/storage/store';

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
  const { isAuth, idToken } = useAppSelector((state: RootState) => state.auth);
  const { typeOfUser } = useAppSelector((state: RootState) => state.userSelection);

  const { push } = useRouter();
  const { decodedToken, isExpired } = useJwt(idToken || '');

  const handleLogoutClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const it = localStorage.getItem('it');
    if (it != undefined && !isExpired) {
      logoutWin(it);
      dispatch(setSelectedTreeId('0'));
      dispatch(setArrayIds(['0']));
      // dispatch(authActions.setIsAuth(false))
      dispatch(setTypeOfUserUndefined()); 
    }
    await dispatch(authActions.setNoAccess());

    console.log('не понятно что это');
    // await push("/login")
  };

  const handleLoginClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
      <div className={styles.role} onClick={() => dispatch(setIsOpen(true))}>
        {typeOfUser?.firstname} {typeOfUser?.lastname}
      </div>
      <ul className={styles.sign}>
        {isAuth ? (
          <button onClick={handleLogoutClick}>Выход</button>
        ) : (
          <button onClick={handleLoginClick}>Вход</button>
        )}
      </ul>
    </div>
  );
};

export default Header;
