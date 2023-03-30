import Link from 'next/link';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link href='/' className={styles.item}>
        Главная
      </Link>
      <div className={styles.item}>Выход/Вход</div>
    </div>
  );
};

export default Header;
