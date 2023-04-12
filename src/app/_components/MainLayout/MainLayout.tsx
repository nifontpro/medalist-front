import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/redux/hooks';
import Spinner from '@/ui/Spinner/Spinner';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth, loading } = useAppSelector((state) => state.auth);
  const state = localStorage.getItem('state');

  if (isAuth !== false) {
    return (
      <div className={styles.wrapperMainLayout} {...props}>
        <Header className={styles.header} />
        <Sidebar className={styles.sidebar} />

        <div className={styles.content}>{children}</div>
      </div>
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
