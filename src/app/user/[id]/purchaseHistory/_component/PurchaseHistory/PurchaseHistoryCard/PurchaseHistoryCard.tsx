/* eslint-disable react/display-name */
'use client';

import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './PurchaseHistoryCard.module.scss';
import { PurchaseHistoryCardProps } from './PurchaseHistoryCard.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import P from '@/ui/P/P';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getGiftEditUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import { useShopAdmin } from '@/api/shop/useShopAdmin';
import PayCodeBtn from '@/ui/PayCodeBtn/PayCodeBtn';
import { useAppSelector } from '@/store/hooks/hooks';
import { SelectGetGiftSettings } from '@/store/features/giftSettings/giftSettings-selectors';
import { formatNumberWithSpaces } from '@/utils/formatNumberWithSpace';
import { RootState } from '@/store/storage/store';
import EditPanelPurchaseHistory from '@/ui/EditPanelPurchaseHistory/EditPanelPurchaseHistory';

const PurchaseHistoryCard = motion(
  forwardRef(
    (
      { gift, className, ...props }: PurchaseHistoryCardProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { typeOfUser } = useAppSelector(
        (state: RootState) => state.userSelection
      );
      const { push } = useRouter();

      const { returnAdminAsync, giveAdminAsync, returnUserAsync } =
        useShopAdmin();

      const settings = useAppSelector(SelectGetGiftSettings);

      return (
        <>
          <div ref={ref} {...props} className={cn(styles.wrapper, className)}>
            {gift.payCode !== 'RETURN' &&
              typeOfUser?.roles.includes('ADMIN') && (
                <EditPanelPurchaseHistory
                  onlyRemove={gift.payCode === 'GIVEN' ? true : false}
                  gift={true}
                  handleRemove={() => giveAdminAsync(gift.id)}
                  id={gift.id.toString()}
                  getUrlEdit={getGiftEditUrl}
                  className={styles.dots}
                  handlereturn={() => returnAdminAsync(gift.id)}
                  paycode={gift.payCode}
                />
              )}
            {typeOfUser?.id === gift?.user.id &&
              typeOfUser?.roles.length == 1 &&
              typeOfUser?.roles[0] === 'USER' &&
              gift.payCode === 'PAY' && (
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
              onClick={() => push(`gifts/${gift.product.id}`)}
            >
              <ImageDefault
                src={gift.product.normImg ? gift.product.normImg : undefined}
                width={300}
                height={300}
                alt={gift.product.name}
                className={
                  gift.product.normImg
                    ? 'rounded-[44px] object-contain'
                    : 'object-contain'
                }
                forWhat='gift'
              />
            </div>
            <div className={styles.content}>
              <P size='m' color='black' className={styles.name}>
                {gift.product.name}
              </P>
              <P
                size='xs'
                fontstyle='thin'
                color='gray'
                className={styles.description}
              >
                {gift.product.shortDescription}
              </P>
            </div>
            <div className='flex gap-[20px] items-center mt-auto'>
              <P
                size='xl'
                fontstyle='thin'
                color='gray'
                className='flex gap-[5px] items-end'
              >
                {formatNumberWithSpaces(gift.product.price)}
                <span className='text-[17px] leading-[21px]'>
                  {settings?.payName || ''}
                </span>
              </P>
            </div>
            <PayCodeBtn gift={gift} />
          </div>
        </>
      );
    }
  )
);

PurchaseHistoryCard.displayName = 'PurchaseHistoryCard';
export default memo(PurchaseHistoryCard);
