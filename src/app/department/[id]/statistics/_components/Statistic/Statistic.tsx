'use client';

import styles from './Statistic.module.scss';
import { StatisticProps } from './Statistic.props';
import Htag from '@/ui/Htag/Htag';
import StatisticCountAwards from './StatisticCountAwards/StatisticCountAwards';
import StatisticCountNominee from './StatisticCountNominee/StatisticCountNominee';
import StatisticUsersGender from './StatisticUsersGender/StatisticUsersGender';
import StatisticUsersAwards from './StatisticUsersAwards/StatisticUsersAwards';
import { useRouter } from 'next/navigation';
import StatisticActivity from './StatisticActivity/StatisticActivity';

const Statistic = ({
  departId,
  className,
  ...props
}: StatisticProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div {...props} className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h3' className={styles.header}>
          Статистика
        </Htag>
        <div className={styles.headerTitle}></div>
      </div>

      <div className={styles.content}>
        <StatisticCountAwards
          departId={departId}
          className={styles.countAwards}
          onClick={() => push('/award')}
        />

        <StatisticCountNominee
          className={styles.countNominee}
          departId={departId}
        />

        <StatisticUsersGender
          departId={departId}
          className={styles.usersGender}
        />

        <StatisticUsersAwards
          departId={departId}
          className={styles.usersAwards}
        />

        <StatisticActivity departId={departId} className={styles.activity} />
      </div>
    </div>
  );
};

export default Statistic;
