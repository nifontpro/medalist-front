import styles from './MainNominee.module.scss';
import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';

import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';
import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import DefaultImgPNG from '@/icons/medalistDefaultImg.png';
import MoneyPreview from '@/ui/MoneyPreview/MoneyPreview';
import { useMainNominee } from './useMainNominee';

const MainNominee = ({
  deptId,
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const {
    push,
    isLoadingSingleNominee,
    lastNominee,
    defaultColorImg,
    currentDate,
  } = useMainNominee(deptId);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Номинации</Htag>
        <div
          className={styles.bestNominee}
          onClick={() => push(`/department/${deptId}/awards?active=NOMINEE`)}
        >
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon />
        </div>
      </div>
      {isLoadingSingleNominee && isLoadingSingleNominee ? (
        <SpinnerSmall />
      ) : (
        <div
          className={styles.content}
          onClick={() => push(`/award/${lastNominee?.id}`)}
        >
          {lastNominee && (
            <MoneyPreview
              value={lastNominee.score}
              className={styles.score}
              currency={'₽'}
            />
          )}
          <div className={styles.img}>
            <ImageDefault
              src={
                defaultColorImg === true
                  ? lastNominee?.images[0]?.imageUrl ?? undefined
                  : DefaultImgPNG
              }
              width={236}
              height={236}
              alt='preview image '
              className={styles.imgDefault}
              priority={true}
              forWhat='award'
            />
          </div>

          <div className={styles.wrapper2}>
            <P size='m' color='white' className={styles.countAwardsTitle}>
              {lastNominee?.name}
            </P>
            {lastNominee && (
              <MoneyPreview
                value={lastNominee.score}
                className={styles.scoreMedia}
                currency={'₽'}
              />
            )}
            <div className={styles.imgCenter}>
              <ImageDefault
                src={
                  defaultColorImg === true
                    ? lastNominee?.images[0]?.imageUrl ?? undefined
                    : DefaultImgPNG
                }
                width={236}
                height={236}
                alt='preview image'
                // objectFit='cover'
                className='rounded-[10px]'
                priority={true}
                forWhat='award'
              />
            </div>
            <div className={styles.countEnd}>
              {lastNominee?.endDate != undefined ? (
                <>
                  <P size='s' color='white' fontstyle='thin'>
                    Заканчивается
                  </P>

                  {Math.floor((lastNominee.endDate - currentDate) / 86400000) !=
                  0 ? (
                    <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                      через{' '}
                      {Math.floor(
                        (lastNominee.endDate - currentDate) / 86400000
                      )}{' '}
                      {declOfNum(
                        Math.floor(
                          (lastNominee.endDate - currentDate) / 86400000
                        ),
                        ['день', 'дня', 'дней']
                      )}
                    </ButtonIcon>
                  ) : (
                    <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                      сегодня
                    </ButtonIcon>
                  )}
                </>
              ) : (
                <P size='s' color='white' fontstyle='thin'>
                  Номинаций пока нет
                </P>
              )}
            </div>
          </div>
          <div className={styles.imgEnd}>
            <ImageDefault
              src={
                defaultColorImg === true
                  ? lastNominee?.images[0]?.imageUrl ?? undefined
                  : DefaultImgPNG
              }
              width={236}
              height={236}
              alt='preview image'
              // objectFit='cover'
              className='rounded-[10px]'
              priority={true}
              forWhat='award'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MainNominee);

//Для мемоизации svg icon
const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________
