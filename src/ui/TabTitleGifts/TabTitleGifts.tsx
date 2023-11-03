import styles from './TabTitleGifts.module.scss';
import cn from 'classnames';
import { TabTitleGiftsProps } from './TabTitleGifts.props';
import Htag from '@/ui/Htag/Htag';
import { memo } from 'react';

const TabTitleGifts = ({
  available,
  setAvailable,
  onClickActive,
  className,
  children,
  ...props
}: TabTitleGiftsProps): JSX.Element => {
  return (
    <Htag
      tag='h3'
      color='gray'
      onClick={() => setAvailable(onClickActive)}
      className={cn(
        styles.award,
        {
          [styles.active]: available === onClickActive,
        },
        className
      )}
    >
      {children}
    </Htag>
  );
};

export default memo(TabTitleGifts);
