import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import cn from 'classnames';

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Link href='/'>Лого</Link>
      <div className={styles.container}>
        <div className={styles.item}>Личный кабинет</div>
        <div className={styles.item}>Поиск</div>
        <div className={styles.item}>Уведомления</div>
        <div className={styles.item}>Выход/Вход</div>
      </div>
    </div>
  );
};

export default Header;
