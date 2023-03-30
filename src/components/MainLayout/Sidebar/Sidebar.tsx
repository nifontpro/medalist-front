import React from 'react';
import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';
import Link from 'next/link';

const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.container}>
        <Link href='/content1' className={styles.item}>
          Страница 1
        </Link>
        <Link href='/content2' className={styles.item}>
          Страница 2
        </Link>
        <Link href='/content3' className={styles.item}>
          Страница 3
        </Link>
        <Link href='/content4' className={styles.item}>
          Страница 4
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
