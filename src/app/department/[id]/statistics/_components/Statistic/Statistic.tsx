'use client';

import styles from './Statistic.module.scss';
import { StatisticProps } from './Statistic.props';
import Htag from '@/ui/Htag/Htag';
import StatisticCountAwards from './StatisticCountAwards/StatisticCountAwards';
import StatisticCountNominee from './StatisticCountNominee/StatisticCountNominee';
import StatisticUsersGender from './StatisticUsersGender/StatisticUsersGender';
import StatisticUsersAwards from './StatisticUsersAwards/StatisticUsersAwards';
import { useRouter } from 'next/navigation';
import StatisticDepartments from './StatisticDepartments/StatisticDepartments';
import { memo } from 'react';
import SwitchDepartOnCompany from '@/ui/SwitchDepartOnCompany/SwitchDepartOnCompany';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';
import NoAccessError from '@/ui/ErrorPages/NoAccessError/NoAccessError';

const Statistic = ({
  departId,
  className,
  ...props
}: StatisticProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { push } = useRouter();

  // Получить колличество наград в отделе
  const { data: colAwardsOnDepartment, isLoading: isLoadingColAwardsOnDept } =
    awardApi.useGetAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(departId),
        baseRequest: {
          // subdepts: switcher
          subdepts: true,
        },
      },
      {
        skip: !departId || !typeOfUser,
      }
    );

  // Получить колличество наград в отделе
  const { data: colNomineeOnDepartment, isLoading: isLoadingColNomineeOnDept } =
    awardApi.useGetAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(departId),
        baseRequest: {
          // subdepts: switcher
          subdepts: true,
        },
      },
      {
        skip: !departId || !typeOfUser,
      }
    );

  let isSuccess =
    colAwardsOnDepartment?.success && colNomineeOnDepartment?.success;
  let isLoading = isLoadingColAwardsOnDept && isLoadingColNomineeOnDept;

  if (!isSuccess && !isLoading) {
    return <NoAccessError />;
  } else {
    return (
      <div {...props} className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h2' className={styles.header}>
            Статистика
          </Htag>
          {/* <SwitchDepartOnCompany /> */}
          <div className={styles.headerTitle}></div>
        </div>

        <div className={styles.content}>
          <StatisticCountAwards
            colAwardsOnDepartment={colAwardsOnDepartment}
            className={styles.countAwards}
            onClick={() => push(`department/${departId}/awards?active=FINISH`)}
          />

          <StatisticCountNominee
            className={styles.countNominee}
            colNomineeOnDepartment={colNomineeOnDepartment}
            onClick={() => push(`department/${departId}/awards?active=NOMINEE`)}
          />

          <StatisticDepartments
            departId={departId}
            className={styles.countDepartment}
          />

          <StatisticUsersGender
            departId={departId}
            className={styles.usersGender}
          />

          <StatisticUsersAwards
            departId={departId}
            className={styles.usersAwards}
          />
        </div>
      </div>
    );
  }
};

export default memo(Statistic);
