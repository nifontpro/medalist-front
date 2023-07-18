'use client';

import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import UserLogo from './UserLogo/UserLogo';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import MenuIconSvg from '@/icons/menu.svg';
import { useHeader } from './useHeader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import Logo from '@/ui/Logo/Logo';
import ChangeRole from '@/ui/ChangeRole/ChangeRole';
import Notification from './Notification/Notification';
import { memo } from 'react';

const Header = ({ className, ...props }: HeaderProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { singleUser } = useUserAdmin(String(typeOfUser?.id));

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
        <ChangeRole />
        <div className={styles.user}>
          <Notification />
          <UserLogo user={singleUser?.data?.user} className={styles.userImg} />
        </div>
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
