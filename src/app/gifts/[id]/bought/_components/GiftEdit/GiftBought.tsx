'use client';

import styles from './GiftBought.module.scss';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { GiftBoughtProps } from './GiftBought.props';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import P from '@/ui/P/P';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { productApi } from '@/api/shop/product/product.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';

export const GiftBought = ({ id }: GiftBoughtProps) => {
  const { push } = useRouter();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награду по id
  const { data: gift, isLoading: isLoadingGift } = productApi.useGetByIdQuery(
    {
      authId: typeOfUser?.id!,
      productId: Number(id),
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  if (isLoadingGift) return <Spinner />;
  if (!gift?.success) return <NoAccess errors={gift?.errors} />;

  return (
    <main>
      <ButtonCircleIcon
        onClick={() => push(`/gifts/${id}`)}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться к призу
      </ButtonCircleIcon>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <P size='xl'>Поздравляем!</P>
          <P size='l' fontstyle='thin'>
            Этот приз уже ваш:
          </P>
        </div>

        <ImageDefault
          src={
            gift.data?.product.normImg ? gift.data?.product.normImg : undefined
          }
          width={600}
          height={600}
          alt='preview image'
          className={styles.image}
          forWhat={'gift'}
        />

        <div className={styles.content}>
          <P size='l'>{gift.data?.product.name}</P>
          <P size='s' fontstyle='thin'>
            {gift.data?.product.shortDescription}
          </P>
        </div>

        <div className={styles.place}>
          <P size='s'>Где получить приз?</P>
          <P size='s' fontstyle='thin' className={styles.placeText}>
            {gift.data?.place}
          </P>
        </div>
      </div>
    </main>
  );
};

export default memo(GiftBought);
