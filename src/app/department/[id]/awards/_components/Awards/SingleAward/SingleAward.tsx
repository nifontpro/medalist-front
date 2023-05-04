/* eslint-disable react/display-name */
'use client'

import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import styles from './SingleAward.module.scss';
import { SingleAwardProps } from './SingleAward.props';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';

const SingleAward = motion(
  forwardRef(
    (
      { award, className, ...props }: SingleAwardProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      let currentDate = +new Date();

      if (award.type == 'SIMPLE' || award.type == 'UNDEF') {
        return (
          <div
            ref={ref}
            {...props}
            className={cn(styles.wrapper, styles.wrapperAward, className)}
          >
            <div className={styles.img}>
              <ImageDefault
                src={undefined}
                width={165}
                height={165}
                alt={award.name}
                objectFit='cover'
                className='rounded-full'
                // priority={true}
              />
            </div>
            <div>
              <P size='m' color='white' className={styles.name}>
                {award.name}
              </P>
              {/* <CountUsersPreview
                appearanceBtn='black'
                usersAwards={award.relateUsers}
                className={styles.default}
              /> */}
            </div>
          </div>
        );
      } else if (award.type == 'PERIOD') {
        return (
          <div
            ref={ref}
            {...props}
            className={cn(styles.wrapper, styles.wrapperNominee, className)}
          >
            <div className={styles.nominee}>Номинация</div>
            <div className={styles.imgNominee}>
              <ImageDefault
                src={undefined}
                width={165}
                height={165}
                alt={award.name}
                objectFit='cover'
                className='rounded-full'
                // priority={true}
              />
            </div>
            <div>
              <div className={styles.nomineeAdaptive}>Номинация</div>
              <P size='m' color='white' className={styles.name}>
                {award.name}
              </P>
              <P
                size='xs'
                color='gray96'
                fontstyle='thin'
                className={styles.date}
              >
                Награждение через
                <ButtonIcon className={styles.btnIcon} appearance='whiteBlack'>
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
            </div>
          </div>
        );
      } else {
        return <div ref={ref}></div>;
      }
    }
  )
);

SingleAward.displayName = 'SingleAward';
export default SingleAward;
