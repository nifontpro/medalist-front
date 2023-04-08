'use client';
import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedTreeId } from '../Sidebar/sidebarTree.slice';

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link
        href='/'
        className={styles.logo}
        onClick={() => dispatch(setSelectedTreeId('0'))}
      >
        <LogoIcon className='w-[200px]' />
      </Link>
      <div className={styles.sign}>Выход/Вход</div>
    </div>
  );
};

export default Header;
