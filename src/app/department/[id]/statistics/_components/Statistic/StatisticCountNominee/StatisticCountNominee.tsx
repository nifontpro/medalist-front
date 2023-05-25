import styles from './StatisticCountNominee.module.scss';
import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import ArrowIcon from '@/icons/arrowRight.svg';
import CupIcon from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';

const StatisticCountNominee = ({
  departId,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  const { push } = useRouter();
  const { colAwardsActivOnDepartment, isLoadingColAwardsActivOnDepartment } =
    useAwardAdmin(departId);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon className={styles.img} />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Номинации
            </P>
            {!isLoadingColAwardsActivOnDepartment &&
            colAwardsActivOnDepartment ? (
              <P size='xl'>{colAwardsActivOnDepartment.data?.length}</P>
            ) : (
              <P size='xl'>0</P>
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

export default StatisticCountNominee;
