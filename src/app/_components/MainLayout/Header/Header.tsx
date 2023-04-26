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

const Header = ({ className, ...props }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { singleUser } = useUserAdmin(String(typeOfUser?.id));

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
        {singleUser?.data?.user.firstname} {singleUser?.data?.user.lastname}
      </div>
      <div className={styles.user}>
        <div></div>
        {/* <Notification allMessage={allMessage} /> */}
        <UserLogo user={singleUser?.data?.user} className={styles.userImg} />
      </div>
    </div>
  );
};

export default Header;
