import styles from './StatisticCountAwards.module.scss';
import { StatisticCountAwardsProps } from './StatisticCountAwards.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { memo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';

const StatisticCountAwards = ({
  departId,
  className,
  ...props
}: StatisticCountAwardsProps): JSX.Element => {
  const switcher = useAppSelector((state) => state.switcher);

  const { colAwardsOnDepartment, isLoadingColAwardsOnDept } = useAwardAdmin(
    departId,
    {
      // subdepts: switcher
      subdepts: true,
    }
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Награды
            </P>
            {isLoadingColAwardsOnDept ? (
              <SpinnerSmall position='start' />
            ) : (
              <P size='xl'>{colAwardsOnDepartment?.data?.finish}</P>
            )}
          </div>
        </div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default StatisticCountAwards;

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
