/* eslint-disable react/display-name */
'use client';

import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './Gift.module.scss';
import { GiftProps } from './Gift.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import Button from '@/ui/Button/Button';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getGiftEditUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useShopAdmin } from '@/api/shop/useShopAdmin';

const Gift = motion(
  forwardRef(
    (
      { gift, className, ...props }: GiftProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { push } = useRouter();

      const { deleteUserAsync } = useShopAdmin();

      return (
        <div ref={ref} {...props} className={cn(styles.wrapper, className)}>
          <EditPanelAuthBtn
            onlyRemove={false}
            handleRemove={deleteUserAsync}
            id={gift.id.toString()}
            getUrlEdit={getGiftEditUrl}
            className={styles.dots}
          />

          <div className={styles.img} onClick={() => push(`gifts/${gift.id}`)}>
            <ImageDefault
              src={gift.normImg ? gift.normImg : undefined}
              width={300}
              height={300}
              alt={gift.name}
              className={
                gift.normImg ? 'rounded-full object-contain' : 'object-contain'
              }
              forWhat='gift'
            />
          </div>
          <div className={styles.content}>
            <P size='m' color='black' className={styles.name}>
              {gift.name}
            </P>
            <P
              size='xs'
              fontstyle='thin'
              color='gray'
              className={styles.description}
            >
              {gift.description}
            </P>
            <div className='flex gap-[20px] items-center'>
              <P
                size='xl'
                fontstyle='thin'
                color='gray'
                className='flex gap-[5px] items-end'
              >
                {gift.price}
                <span className='text-[17px] leading-[21px]'>₽</span>
              </P>
              <ButtonIcon appearance={'grayGifts'}>
                <P size='s' color='gray'>
                  {gift.count} шт
                </P>
              </ButtonIcon>
            </div>
            <Button
              onClick={() => toast('Купить')}
              appearance={'white'}
              size='l'
              disabled={false}
            >
              Купить
            </Button>
          </div>
        </div>
      );
    }
  )
);

Gift.displayName = 'Gift';
export default memo(Gift);
