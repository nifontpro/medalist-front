import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import UserSelection from './UserSelection/UserSelection';
import Spinner from '@/ui/Spinner/Spinner';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useUserSelection } from './UserSelection/useUserSelection';
import {
  setIsOpen,
  setTypeOfUser,
} from '@/store/features/userSelection/userSelection.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const session = useSession();
  const dispatch = useAppDispatch();

  const {
    typeOfUser,
    isOpen,
    pathName,
    rolesUser,
    handleChangeRole,
    isLoading,
    push,
    setIsOpen,
  } = useUserSelection();

  useEffect(() => {
    if (
      session.status != 'loading' &&
      session.status != 'unauthenticated' &&
      session.data &&
      !typeOfUser
    ) {
      dispatch(setIsOpen(true));
    }
  }, [dispatch, session, typeOfUser, rolesUser, setIsOpen]);

  console.log(session);

  if (session.status === 'loading') return <Spinner />;

  if (session.data === null) {
    return redirect('/auth/signin');
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
