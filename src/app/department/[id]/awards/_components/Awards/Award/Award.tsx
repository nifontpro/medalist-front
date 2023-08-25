/* eslint-disable react/display-name */
'use client';

import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './Award.module.scss';
import { AwardProps } from './Award.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
import React, { ForwardedRef, forwardRef, memo } from 'react';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import CountUsersPreview from '@/ui/CountUsersPreview/CountUsersPreview';

const Award = motion(
  forwardRef(
    (
      { award, className, ...props }: AwardProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      let currentDate = +new Date();

      if (award.state == 'FINISH' || award.state == 'ERROR') {
        return (
          <div
            ref={ref}
            {...props}
            className={cn(styles.wrapper, styles.wrapperAward, className)}
          >
            <div className={styles.img}>
              <ImageDefault
                src={award.mainImg}
                width={165}
                height={165}
                alt={award.name}
                objectFit='cover'
                className='rounded-full object-contain w-auto'
                // priority={true}
              />
            </div>
            <div>
              <P size='m' color='white' className={styles.name}>
                {award.name}
              </P>
              <CountUsersPreview
                appearanceBtn='black'
                usersAwards={undefined}
                className={styles.default}
              />
            </div>
          </div>
        );
      } else if (award.state == 'NOMINEE' || award.state == 'FUTURE') {
        return (
          <div
            ref={ref}
            {...props}
            className={cn(styles.wrapper, styles.wrapperNominee, className)}
          >
            <div className={styles.nominee}>Номинация</div>
            <div className={styles.imgNominee}>
              <ImageDefault
                src={award.mainImg}
                width={165}
                height={165}
                alt={award.name}
                className='rounded-full object-contain w-auto'
                // priority={true}
              />
              Ï
            </div>
            <div>
              <div className={styles.nomineeAdaptive}>Номинация</div>
              <P size='m' color='white' className={styles.name}>
                {award.name}
              </P>
              {award.state == 'NOMINEE' ? (
                <P
                  size='xs'
                  color='gray96'
                  fontstyle='thin'
                  className={styles.date}
                >
                  Награждение через
                  <ButtonIcon
                    className={styles.btnIcon}
                    appearance='whiteBlack'
                  >
                    {Math.floor(
                      (award.endDate - currentDate) / 1000 / 60 / 60 / 24
                    )}{' '}
                    {declOfNum(
                      Math.floor(
                        (award.endDate - currentDate) / 1000 / 60 / 60 / 24
                      ),
                      ['день', 'дня', 'дней']
                    )}
                  </ButtonIcon>
                </P>
              ) : (
                <P
                  size='xs'
                  color='gray96'
                  fontstyle='thin'
                  className={styles.date}
                >
                  Начнется через
                  <ButtonIcon
                    className={styles.btnIcon}
                    appearance='whiteBlack'
                  >
                    {Math.floor(
                      (award.startDate - currentDate) / 1000 / 60 / 60 / 24
                    )}{' '}
                    {declOfNum(
                      Math.floor(
                        (award.startDate - currentDate) / 1000 / 60 / 60 / 24
                      ),
                      ['день', 'дня', 'дней']
                    )}
                  </ButtonIcon>
                </P>
              )}
            </div>
          </div>
        );
      } else {
        return <div ref={ref}></div>;
      }
    }
  )
);

Award.displayName = 'Award';
export default memo(Award);
