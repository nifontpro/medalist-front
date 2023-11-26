import styles from './GiftConfirmationContent.module.scss';
import cn from 'classnames';
import { GiftConfirmationContentProps } from './GiftConfirmationContent.props';

import { memo } from 'react';
import P from '../P/P';
import { useAppSelector } from '@/store/hooks/hooks';
import { SelectGetGiftSettings } from '@/store/features/giftSettings/giftSettings-selectors';

const GiftConfirmationContent = ({
  gift,
  className,
  ...props
}: GiftConfirmationContentProps): JSX.Element => {
  const settings = useAppSelector(SelectGetGiftSettings);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P size='l' className={styles.text}>
        Вы готовы потратить
      </P>
      <P size='xl' fontstyle='thin' className={styles.text}>
        {gift.price} {settings?.payName || ''}
      </P>
      <P size='l' fontstyle='thin' className={styles.text}>
        на
      </P>
      <P size='xl' className={styles.textName}>
        {gift.name}
      </P>
      <P size='l' fontstyle='thin' className={styles.text}>
        {gift.shortDescription}
      </P>
    </div>
  );
};
export default memo(GiftConfirmationContent);
