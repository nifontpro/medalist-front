import styles from './SingleGiftGet.module.scss';
import { SingleGiftGetProps } from './SingleGiftGet.props';
import cn from 'classnames';
import { memo } from 'react';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';

const SingleGiftGet = ({
  gift,
  className,
  ...props
}: SingleGiftGetProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.giftContent}>
        <Htag tag='h1' className={styles.header}>
          Где получить?
        </Htag>
        <P size='s' fontstyle='thin' className={styles.content}>
          {gift.place}
        </P>
      </div>
    </div>
  );
};

export default memo(SingleGiftGet);
