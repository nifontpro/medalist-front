import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';
import Spinner from '@/ui/Spinner/Spinner';
import { redirect, usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  const pathName = usePathname();
  const refresh = localStorage.getItem('refresh');

  if (isAuth && refresh) {
    return (
      <>
        <div className={styles.wrapperMainLayout} {...props}>
          <Header className={styles.header} />
          {typeOfUser && <Sidebar className={styles.sidebar} />}

          <div className={styles.content}>{children}</div>
        </div>
        <UserSelection />
      </>
    );
  } else if (pathName.slice(0,6) === '/login') {
    return <>{children}</>;
  } else {
    deleteCookie('exp'); // Для middleware
    return redirect('/login')
  }
};

export default MainLayout;
