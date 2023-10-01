import styles from './TabTitle.module.scss';
import cn from 'classnames';
import { TabTitleProps } from './TabTitle.props';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { memo } from 'react';

const TabTitle = ({
  count,
  setActive,
  active,
  setPage,
  onClickActive,
  className,
  children,
}: TabTitleProps): JSX.Element => {
  return (
    <Htag
      tag='h3'
      color='gray'
      onClick={() => {
        setActive(onClickActive);
        setPage(0);
      }}
      className={cn(
        styles.award,
        {
          [styles.active]: active === onClickActive,
        },
        className
      )}
    >
      {children}
      {count && (
        <P
          size='s'
          color={active == onClickActive ? 'black' : 'gray96'}
          className={styles.awardsCount}
        >
          {count}
        </P>
      )}
    </Htag>
  );
};

export default memo(TabTitle);
