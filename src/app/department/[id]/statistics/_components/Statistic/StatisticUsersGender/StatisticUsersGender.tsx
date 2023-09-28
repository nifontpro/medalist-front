import DoughnutCircle from '@/ui/DoughnutCircle/DoughnutCircle';
import styles from './StatisticUsersGender.module.scss';
import { StatisticUsersGenderProps } from './StatisticUsersGender.props';
import cn from 'classnames';
import P from '@/ui/P/P';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { memo, useMemo } from 'react';
import { useStatisticUsersGender } from './useStatisticUsersGender';

const StatisticUsersGender = ({
  departId,
  className,
  ...props
}: StatisticUsersGenderProps): JSX.Element => {
  const { countMale, countFemale, countFemalePercent, countMalePercent } =
    useStatisticUsersGender(departId);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l' className={styles.title}>
        Сотрудники
      </P>
      <DoughnutCircle
        className={styles.doughnut}
        dataOne={countMale}
        colorOne='#E5F23B'
        dataTwo={countFemale}
        colorTwo='rgba(57, 57, 57, 1)'
      />
      <div className={styles.description}>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotFemale}></div>
            <P size='l' color='gray'>
              Женщин
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countFemale}
            </P>
            <P size='s' className={styles.percent}>
              {countFemalePercent}%
            </P>
          </div>
        </div>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotMale}></div>
            <P size='l' color='gray'>
              Мужчин
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countMale}
            </P>
            <P size='s' className={styles.percent}>
              {countMalePercent}%
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(StatisticUsersGender);
