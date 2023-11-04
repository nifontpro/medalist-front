import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';
import { memo } from 'react';
import React from 'react';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

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
};

export default memo(MainLayout);
