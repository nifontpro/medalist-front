import styles from './TabTitleHistory.module.scss';
import cn from 'classnames';
import { TabTitleHistoryProps } from './TabTitleHistory.props';
import Htag from '@/ui/Htag/Htag';
import { memo } from 'react';

const TabTitleHistory = ({
  setPaycode,
  paycode,
  onClickActive,
  className,
  children,
  ...props
}: TabTitleHistoryProps): JSX.Element => {
  return (
    <Htag
      tag='h3'
      color='gray'
      onClick={() => {
        setPaycode(onClickActive);
      }}
      className={cn(
        styles.award,
        {
          [styles.active]: paycode === onClickActive,
        },
        className
      )}
    >
      {children}
    </Htag>
  );
};

export default memo(TabTitleHistory);
