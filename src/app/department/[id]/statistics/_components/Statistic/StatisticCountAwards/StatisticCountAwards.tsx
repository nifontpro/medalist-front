import styles from './StatisticCountAwards.module.scss';
import { StatisticCountAwardsProps } from './StatisticCountAwards.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import CupIcon from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { useRouter } from 'next/navigation';

const StatisticCountAwards = ({
  departId,
  className,
  ...props
}: StatisticCountAwardsProps): JSX.Element => {
  const { push } = useRouter();
  const { colAwardsOnDepartment, isLoadingColAwardsOnDept } =
    useAwardAdmin(departId);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon className={styles.img} />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Медалий в отделе
            </P>
            {isLoadingColAwardsOnDept ? (
              <P size='xl'>0</P>
            ) : (
              <P size='xl'>{colAwardsOnDepartment?.data}</P>
            )}
          </div>
        </div>
        <ArrowIcon
          onClick={() => push('/statistic')}
          className={styles.arrow}
        />
      </div>
    </div>
  );
};

export default StatisticCountAwards;
