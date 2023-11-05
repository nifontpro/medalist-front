import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import UserSelection from './UserSelection/UserSelection';
import { memo } from 'react';
import React from 'react';
import { useMainLayout } from './useMainLayout';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const { typeOfUser, rolesUser, isLoading, expandedIds, selectedIds } =
    useMainLayout();

  return (
    <>
      <div className={styles.wrapperMainLayout} {...props}>
        <Header className={styles.header} />

        {typeOfUser && <Sidebar className={styles.sidebar} />}

        <div className={styles.content}>{children}</div>
      </div>

      <UserSelection
        rolesUser={rolesUser}
        isLoading={isLoading}
        expandedIds={expandedIds}
        selectedIds={selectedIds}
      />
    </>
  );
};

export default memo(MainLayout);
