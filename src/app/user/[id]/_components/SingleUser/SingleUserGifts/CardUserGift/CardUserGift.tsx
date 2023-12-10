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
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const CardUserGift = ({
  user,
  gift,
  className,
  ...props
}: CardUserGiftProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { push } = useRouter();
  const { returnUserAsync } = useShopAdmin();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {typeOfUser?.id === user?.user.id && (
        <EditPanelAuthBtn
          onlyRemove={true}
          gift={true}
          handleRemove={() => returnUserAsync(gift.id)}
          id={gift.id.toString()}
          getUrlEdit={getGiftEditUrl}
          className={styles.dots}
          forMyself={true}
        />
      )}

      <div
        className={styles.img}
        onClick={() => push(`/gifts/${gift.product.id}`)}
      >
        <ImageDefault
          src={gift.product.normImg}
          width={300}
          height={300}
          alt='gift preview'
          className='rounded-[27px]'
          forWhat='gift'
        />
      </div>
      <div className={styles.info}>
        <P size='l'>{gift.product.name}</P>
        <P size='s' fontstyle='thin' color='gray' className={styles.date}>
          {gift.product.shortDescription}
        </P>
      </div>
    </div>
  );
};

export default memo(CardUserGift);
