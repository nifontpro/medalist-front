'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { setIsOpen } from '@/store/features/userSelection/userSelection.slice';
import UserLogo from './UserLogo/UserLogo';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/app/user/useUserAdmin';
import MenuIcon from '@/icons/menu.svg';
import { useHeader } from './useHeader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { singleUser } = useUserAdmin(String(typeOfUser?.id));

  const { windowSize } = useWindowSize();
  const { close, open, navigationVisible } = useHeader();

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
    <header className={cn(styles.wrapper, className)} {...props}>
      <MenuIcon className={styles.menu} onClick={open} />
      <Link
        href='/'
        className={styles.logo}
        onClick={() => dispatch(setSelectedTreeId('0'))}
      >
        <LogoIcon className='w-[200px]' />
      </Link>
      <div className={styles.role} onClick={() => dispatch(setIsOpen(true))}>
        {singleUser?.success == false
          ? `Выберете пользователя`
          : `${singleUser?.data?.user.firstname} ${singleUser?.data?.user.lastname}`}
      </div>
      <div className={styles.user}>
        <div></div>
        {/* <Notification allMessage={allMessage} /> */}
        <UserLogo user={singleUser?.data?.user} className={styles.userImg} />
      </div>
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
    </header>
  );
};

export default Header;
