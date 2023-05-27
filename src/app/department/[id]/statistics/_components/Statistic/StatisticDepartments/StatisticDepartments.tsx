import styles from './StatisticDepartments.module.scss';
import uniqid from 'uniqid';
import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import AwardIcon from '@/icons/union.svg';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import P from '@/ui/P/P';
import Htag from '@/ui/Htag/Htag';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';

const StatisticDepartments = ({
  departId,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {
  const { colAwardsActivRoot, isLoadingColAwardsActivRoot } = useAwardAdmin(
    departId,

    { orders: [{ field: 'awardCount', direction: 'ASC' }], subdepts: true }
  );

  console.log(colAwardsActivRoot);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      {!isLoadingColAwardsActivRoot && colAwardsActivRoot ? (
        colAwardsActivRoot.data?.map((depart, index) => {
          if (index == 0) {
            return (
              <div
                key={uniqid()}
                className={cn(styles.bestDepart, styles.depart)}
              >
                <div>
                  <P size='l'>{depart.deptName}</P>
                  <P size='xs' className={styles.best}>
                    Лучший отдел
                  </P>
                </div>
                <div className={styles.countAwards}>
                  <Htag className={styles.count} tag='h2'>
                    {depart.awardCount}
                  </Htag>
                  <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
                </div>
              </div>
            );
          } else {
            return (
              <div key={uniqid()} className={styles.depart}>
                <P size='l'>{depart.deptName}</P>
                <div className={styles.countAwards}>
                  <Htag className={styles.count} tag='h2'>
                    {depart.awardCount}
                  </Htag>
                  <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
                </div>
              </div>
            );
          }
        })
      ) : (
        <SpinnerSmall />
      )}
    </div>
  );
};

export default StatisticDepartments;
