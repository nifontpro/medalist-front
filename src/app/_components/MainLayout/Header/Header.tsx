'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';
import { setSelectedTreeId } from '@/store/features/sidebar/sidebarTree.slice';
import { setIsOpen } from '@/store/features/userSelection/userSelection.slice';
import { useHeader } from './useHeader';

const Header = ({ className, ...props }: HeaderProps) => {
  const { dispatch, typeOfUser, isAuth, handleLogoutClick, handleLoginClick } =
    useHeader();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link
        href='/'
        className={styles.logo}
        onClick={() => dispatch(setSelectedTreeId('0'))}
      >
        <LogoIcon className='w-[200px]' />
      </Link>
      <div className={styles.role} onClick={() => dispatch(setIsOpen(true))}>
        {typeOfUser?.firstname} {typeOfUser?.lastname}
      </div>
      <ul className={styles.sign}>
        {isAuth ? (
          <button onClick={handleLogoutClick}>Выход</button>
        ) : (
          <button onClick={handleLoginClick}>Вход</button>
        )}
      </ul>
    </div>
  );
};

export default Header;
