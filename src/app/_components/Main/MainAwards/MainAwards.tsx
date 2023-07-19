import styles from './MainAwards.module.scss';
import { MainAwardsProps } from './MainAwards.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import PeopleIconSvg from '@/icons/people.svg';
import UnionIconSvg from '@/icons/union.svg';
import P from '@/ui/P/P';
import Htag from '@/ui/Htag/Htag';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { useMainAwards } from './useMainAwards';
import { memo } from 'react';

const MainAwards = ({ className, ...props }: MainAwardsProps): JSX.Element => {
  const {
    push,
    countUserWithAwardPercent,
    countUserWithAward,
    countAll,
    typeOfUser,
    colAwardsActivRoot,
    isLoadingColAwardsActivRoot,
    numberIsNaN,
  } = useMainAwards();

  return (
    <>
      <div {...props} className={cn(styles.wrapper, className)}>
        <Htag tag='h2'>Медали</Htag>
        <div className={styles.content}>
          <div
            className={cn(styles.allAwards, styles.card)}
            onClick={() => push(`/department/${typeOfUser?.dept.id}/awards`)}
          >
            <div className='flex'>
              <div className={styles.img}>
                <CupIcon />
              </div>
              <div className={styles.description}>
                <P size='s'>Наград</P>
                {countAll ? (
                  <P size='xl'>{countAll}</P>
                ) : (
                  <SpinnerSmall position='start' />
                )}
              </div>
            </div>
            <ArrowIcon />
          </div>
          <div
            className={cn(styles.countAwards, styles.card)}
            onClick={() =>
              push(`/department/${typeOfUser?.dept.id}/statistics`)
            }
          >
            <div className='flex'>
              <div className={styles.img}>
                <PeopleIcon />
              </div> 
              <div className={styles.description}>
                <P size='s'>Есть награды</P>
                <div className='flex items-end'>
                  {countUserWithAward ? (
                    <P size='xl'>{countUserWithAward}</P>
                  ) : (
                    <SpinnerSmall position='start' />
                  )}
                  <P size='l' color='gray' className={styles.percent}>
                    {numberIsNaN ? '0' : countUserWithAwardPercent} %
                  </P>
                </div>
              </div>
            </div>
            <ArrowIcon />
          </div>
          <div
            className={cn(styles.bestDepart, styles.card)}
            onClick={() =>
              push(`/department/${typeOfUser?.dept.id}/statistics`)
            }
          >
            <div className='flex'>
              <div className={styles.img}>
                <UnionIcon />
              </div>

              <div className={styles.description}>
                <P size='s' fontstyle='thin'>
                  Лучший отдел
                </P>
                {isLoadingColAwardsActivRoot ? (
                  <SpinnerSmall />
                ) : (
                  <P size='m' className={styles.countAwardsTitle}>
                    {colAwardsActivRoot &&
                      colAwardsActivRoot.data &&
                      colAwardsActivRoot?.data[0]?.deptName}
                  </P>
                )}
              </div>
            </div>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MainAwards);

//Для мемоизации svg icon
const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';

const PeopleIcon = memo(() => {
  return <PeopleIconSvg className={styles.imgSvg} />;
});
PeopleIcon.displayName = 'PeopleIcon';

const UnionIcon = memo(() => {
  return <UnionIconSvg className={styles.imgSvg} />;
});
UnionIcon.displayName = 'UnionIcon';

const CupIcon = memo(() => {
  return <CupIconSvg className={styles.imgSvg} />;
});
CupIcon.displayName = 'CupIcon';
//__________________
