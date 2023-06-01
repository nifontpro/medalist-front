'use client';

let allMessage: IMessage[] = [
  {
    toId: '63c04e650c26102ec90f212c',
    type: 'SYSTEM',
    theme: 'Награждение',
    themeSlug: 'awardUser',
    text: 'Вами награжден Еселин наградой "Отважный" ',
    read: true,
    sendDate: 1673548791800,
    readDate: 1682524838332,
    imageUrl:
      'https://medalist.storage.yandexcloud.net/C63c04f130c26102ec90f212d/awards/e882c75b-6f30-4594-8fe7-38f17948f5f3.png',
    id: '63c053f70c26102ec90f2141',
  },
];

import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import UserLogo from './UserLogo/UserLogo';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import MenuIcon from '@/icons/menu.svg';
import { useHeader } from './useHeader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import Logo from '@/ui/Logo/Logo';
import ChangeRole from '@/ui/ChangeRole/ChangeRole';
import Notification from './Notification/Notification';
import { IMessage } from './Notification/Notification.props';

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { singleUser } = useUserAdmin(String(typeOfUser?.id));

  const { windowSize } = useWindowSize();
  const { open, navigationVisible } = useHeader();

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
        <MenuIcon className={styles.menu} onClick={open} />
        <Logo className={styles.logo} />
        <ChangeRole />
        <div className={styles.user}>
          <Notification allMessage={allMessage} />
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

export default Header;
