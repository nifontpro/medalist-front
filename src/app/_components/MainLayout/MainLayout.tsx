import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';
import { redirect, usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { memo } from 'react';
import React from 'react';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/auth/auth.api';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  const pathName = usePathname();
  const refresh = localStorage.getItem('refresh');

  function logoutWin() {
    const it = localStorage.getItem('it');
    const params = [
      'post_logout_redirect_uri=' + APP_URI,
      'id_token=' + it,
      'client_id=' + CLIENT_ID,
    ];
    const url = KEYCLOAK_URI + '/logout' + '?' + params.join('&');
    deleteCookie('exp');
    window.open(url, '_self');
  }

  // if (isAuth && refresh) {
  return (
    <>
      <div className={styles.wrapperMainLayout} {...props}>
        <Header className={styles.header} />
        <div onClick={logoutWin} className='absolute top-0 right-0 text-white'>
          Exit
        </div>
        {typeOfUser && <Sidebar className={styles.sidebar} />}

        <div className={styles.content}>{children}</div>
      </div>
      {/* <UserSelection /> */}
    </>
  );
  // } else if (pathName.slice(0, 6) === '/login') {
  //   return <>{children}</>;
  // } else {
  //   deleteCookie('exp'); // Для middleware
  //   return redirect('/login');
  // }
};

export default memo(MainLayout);
