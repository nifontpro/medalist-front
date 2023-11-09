import styles from './CardUserGift.module.scss';
import { CardUserGiftProps } from './CardUserGift.props';
import cn from 'classnames';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getGiftEditUrl } from '@/config/api.config';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useShopAdmin } from '@/api/shop/useShopAdmin';

const CardUserGift = ({
  user,
  gift,
  className,
  ...props
}: CardUserGiftProps): JSX.Element => {
  const { push } = useRouter();
  const { getGift } = useShopAdmin();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <EditPanelAuthBtn
        onlyRemove={true}
        gift={true}
        handleRemove={() => getGift(123)}
        id={gift.id.toString()}
        getUrlEdit={getGiftEditUrl}
        className={styles.dots}
      />

      <div className={styles.img} onClick={() => push(`/gifts/${gift.id}`)}>
        <ImageDefault
          src={gift.normImg}
          width={300}
          height={300}
          alt='gift preview'
          className='rounded-[27px]'
          forWhat='gift'
        />
      </div>
      <div className={styles.info}>
        <P size='l'>{gift.name}</P>
        <P size='s' fontstyle='thin' color='gray' className={styles.date}>
          {gift.shortDescription}
        </P>
      </div>
    </div>
  );
};

export default memo(CardUserGift);
