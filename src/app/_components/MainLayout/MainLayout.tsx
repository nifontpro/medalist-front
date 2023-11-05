import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import UserSelection from './UserSelection/UserSelection';
import { memo, useEffect } from 'react';
import React from 'react';
import { userApi } from '@/api/user/user.api';
import { setArrayIds } from '@/store/features/sidebar/sidebarTree.slice';
import {
  setTypeOfUserUndefined,
  setTypeOfUser_IsOpen,
} from '@/store/features/userSelection/userSelection.slice';

const MainLayout = ({ children, ...props }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  const { data: rolesUser, isLoading } = userApi.useGetProfilesQuery(undefined);

  const { expandedIds, selectedIds } = useAppSelector(
    (state) => state.sidebarTree
  );

  useEffect(() => {
    if (rolesUser?.data?.length && rolesUser?.data?.length > 0) {
      if (
        typeOfUser &&
        rolesUser?.data.filter((role) => role.id == typeOfUser.id).length > 0
      ) {
        dispatch(setArrayIds(expandedIds));
      } else {
        dispatch(setTypeOfUserUndefined());
      }
      if (rolesUser?.data?.length == 1) {
        dispatch(setTypeOfUser_IsOpen(rolesUser?.data[0]));
      }
    } else if (rolesUser?.data?.length == 0) {
      dispatch(setTypeOfUserUndefined());
    }
  });

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
