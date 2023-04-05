import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import LogoIcon from '@/icons/logo.svg';

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link href='/' className={styles.logo}>
        <LogoIcon className='w-[200px]'/>
      </Link>
      <div className={styles.sign}>Выход/Вход</div>
    </div>
  );
};

export default Header;
