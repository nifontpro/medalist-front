import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';
import Spinner from '@/ui/Spinner/Spinner';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  const pathName = usePathname();
  // console.log(pathName.indexOf('/login', 0))

  if (isAuth !== false) {
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
  } 
  else if (pathName.indexOf('/login', 0) == 0) {
    return <>{children}</>;
  } else {
    return <Spinner />;
  }
};

export default MainLayout;
