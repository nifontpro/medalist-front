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
import { getAwardEditUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';

const Gift = motion(
  forwardRef(
    (
      { award, className, ...props }: GiftProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { push } = useRouter();

      if (award.state == 'FINISH' || award.state == 'ERROR') {
        return (
          <div ref={ref} {...props} className={cn(styles.wrapper, className)}>
            <EditPanelAuthBtn
              onlyRemove={false}
              handleRemove={() => new Promise(() => console.log(123))}
              id={'12'}
              getUrlEdit={getAwardEditUrl}
              className={styles.dots}
            />

            <div
              className={styles.img}
              onClick={() => push(`gifts/${award.id}`)}
            >
              <ImageDefault
                src={award.mainImg}
                width={300}
                height={300}
                alt={award.name}
                className='rounded-full object-contain'
                forWhat='award'
              />
            </div>
            <div className={styles.content}>
              <P size='m' color='black' className={styles.name}>
                {award.name}
              </P>
              <P
                size='xs'
                fontstyle='thin'
                color='gray'
                className={styles.description}
              >
                Какое то описание супер длинное и непонятное Какое то описание
                супер длинное и непонятное Какое то описание супер длинное и
                непонятное Какое то описание супер длинное и непонятное
              </P>
              <div className='flex gap-[20px] items-center'>
                <P
                  size='xl'
                  fontstyle='thin'
                  color='gray'
                  className='flex gap-[5px] items-end'
                >
                  5000
                  <span className='text-[17px] leading-[21px]'>₽</span>
                </P>
                <ButtonIcon appearance={'grayGifts'}>
                  <P size='s' color='gray'>
                    4 шт
                  </P>
                </ButtonIcon>
              </div>
              <Button
                onClick={() => console.log('Купить')}
                appearance={'white'}
                size='l'
                disabled={false}
              >
                Купить
              </Button>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  )
);

Gift.displayName = 'Gift';
export default memo(Gift);
