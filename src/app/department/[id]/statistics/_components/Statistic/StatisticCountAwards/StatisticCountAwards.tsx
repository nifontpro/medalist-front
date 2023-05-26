import styles from './StatisticCountAwards.module.scss';
import { StatisticCountAwardsProps } from './StatisticCountAwards.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import CupIcon from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';

const StatisticCountAwards = ({
  departId,
  className,
  ...props
}: StatisticCountAwardsProps): JSX.Element => {
  const { colAwardsOnDepartment, isLoadingColAwardsOnDept } = useAwardAdmin(
    departId,
    { subdepts: true }
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon className={styles.img} />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Медали
            </P>
            {isLoadingColAwardsOnDept ? (
              <SpinnerSmall position='start' />
            ) : (
              <P size='xl'>{colAwardsOnDepartment?.data?.finish}</P>
            )}
          </div>
        </div>
        <ArrowIcon className={styles.arrow} />
      </div>
    </div>
  );
};

export default StatisticCountAwards;
