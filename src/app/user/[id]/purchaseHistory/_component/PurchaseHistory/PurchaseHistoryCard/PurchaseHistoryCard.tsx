/* eslint-disable react/display-name */
'use client';

import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './PurchaseHistoryCard.module.scss';
import { PurchaseHistoryCardProps } from './PurchaseHistoryCard.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getGiftEditUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import { useShopAdmin } from '@/api/shop/useShopAdmin';
import PayCodeBtn from '@/ui/PayCodeBtn/PayCodeBtn';

const PurchaseHistoryCard = motion(
  forwardRef(
    (
      { gift, className, ...props }: PurchaseHistoryCardProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { push } = useRouter();

      const { returnAdminAsync } = useShopAdmin();

      return (
        <>
          <div ref={ref} {...props} className={cn(styles.wrapper, className)}>
            <EditPanelAuthBtn
              onlyRemove={true}
              gift={true}
              handleRemove={() => returnAdminAsync(gift.id)}
              id={gift.id.toString()}
              getUrlEdit={getGiftEditUrl}
              className={styles.dots}
            />
            <div
              className={styles.img}
              onClick={() => push(`gifts/${gift.id}`)}
            >
              <ImageDefault
                src={gift.product.normImg ? gift.product.normImg : undefined}
                width={300}
                height={300}
                alt={gift.product.name}
                className={
                  gift.product.normImg
                    ? 'rounded-full object-contain'
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
                {gift.product.price}
                <span className='text-[17px] leading-[21px]'>₽</span>
              </P>
              <ButtonIcon appearance={'grayGifts'}>
                <P size='s' color='gray'>
                  {gift.product.count} шт
                </P>
              </ButtonIcon>
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
