import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

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

  // else if (!state) {
  //   return <Spinner />;
  // }
  else {
    return <>{children}</>;
  }
};

export default MainLayout;
