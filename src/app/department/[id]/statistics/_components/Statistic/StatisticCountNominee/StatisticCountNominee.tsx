import styles from './StatisticCountNominee.module.scss';
import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { memo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';

const StatisticCountNominee = ({
  departId,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  const switcher = useAppSelector((state) => state.switcher);

  const { colAwardsOnDepartment, isLoadingColAwardsOnDept } = useAwardAdmin(
    departId,
    { subdepts: switcher }
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Номинации
            </P>
            {!isLoadingColAwardsOnDept &&
            colAwardsOnDepartment &&
            colAwardsOnDepartment.data ? (
              <P size='xl'>
                {colAwardsOnDepartment.data?.future +
                  colAwardsOnDepartment.data?.nominee}
              </P>
            ) : (
              <SpinnerSmall position='start' />
            )}
          </div>
        </div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default memo(StatisticCountNominee);

//Для мемоизации svg icon
const CupIcon = memo(() => {
  return <CupIconSvg className={styles.img} />;
});
CupIcon.displayName = 'CupIcon';

const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________
