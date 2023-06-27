import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import UserSelection from './UserSelection/UserSelection';
import Spinner from '@/ui/Spinner/Spinner';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { userApi } from '@/api/user/user.api';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  
  const session = useSession();
  console.log(session);

  if (session.status == 'loading') return <Spinner />;

  if (session.data === null) {
    return redirect('/api/auth/signin');
  } else {
    return (
      <>
        <div className={styles.wrapperMainLayout} {...props}>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />

          <div className={styles.content}>{children}</div>
        </div>
        <UserSelection />
      </>
    );
  }
};

export default MainLayout;
