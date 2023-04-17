import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import Spinner from '@/ui/Spinner/Spinner';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

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
