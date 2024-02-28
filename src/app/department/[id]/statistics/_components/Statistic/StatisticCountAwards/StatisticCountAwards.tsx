import styles from './StatisticCountAwards.module.scss';
import { StatisticCountAwardsProps } from './StatisticCountAwards.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { memo } from 'react';

const StatisticCountAwards = ({
  colAwardsOnDepartment,
  className,
  ...props
}: StatisticCountAwardsProps): JSX.Element => {
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Награды
            </P>
            <P size='xl'>{colAwardsOnDepartment?.data?.finish}</P>
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
