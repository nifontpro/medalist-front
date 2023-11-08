'use client';

import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import UserLogo from './UserLogo/UserLogo';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import MenuIconSvg from '@/icons/menu.svg';
import { useHeader } from './useHeader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import Logo from '@/ui/Logo/Logo';
import Notification from './Notification/Notification';
import { memo } from 'react';
import React from 'react';
import { userApi } from '@/api/user/user.api';
import Money from './Money/Money';
import { payApi } from '@/api/shop/pay/pay.api';

const Header = ({ className, ...props }: HeaderProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  // Получить пользоветля по id
  const { data: singleUser, isLoading: isLoadingSingleUser } =
    userApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        userId: typeOfUser?.id!,
      },
      {
        skip: !typeOfUser,
      }
    );

  const { data: moneyUser, isLoading: isLoadingMoneyUser } =
    payApi.useGetUserPayQuery(
      {
        authId: typeOfUser?.id!,
        userId: typeOfUser?.id!,
      },
      {
        skip: !typeOfUser,
      }
    );

  console.log(typeOfUser);

  const { windowSize } = useWindowSize();
  const { navigationVisible } = useHeader();

  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <header className={cn(styles.wrapper, className)} {...props}>
        <MenuIcon />
        <Logo className={styles.logo} />
        {singleUser?.data?.user ? (
          <div className={styles.user}>
            <Notification />
            <Money value={moneyUser?.data?.balance} currency={'₽'} />
            <UserLogo
              user={singleUser?.data?.user}
              className={styles.userImg}
            />
          </div>
        ) : null}
      </header>

      <AnimatePresence mode='wait'>
        {navigationVisible && windowSize.winWidth < 1500 ? (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className='z-[100]'
          >
            <Sidebar className={styles.navigation} />
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);

//Для мемоизации svg icon
const MenuIcon = memo(() => {
  const { open } = useHeader();
  return <MenuIconSvg className={styles.menu} onClick={open} />;
});
MenuIcon.displayName = 'MenuIcon';
//__________________
