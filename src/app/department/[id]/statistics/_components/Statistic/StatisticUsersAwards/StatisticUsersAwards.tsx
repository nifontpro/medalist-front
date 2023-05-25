import P from '@/ui/P/P';
import styles from './StatisticUsersAwards.module.scss';
import { StatisticUsersAwardsProps } from './StatisticUsersAwards.props';
import cn from 'classnames';
import DoughnutCircle from '@/ui/DoughnutCircle/DoughnutCircle';

const StatisticUsersAwards = ({
  departId,
  className,
  ...props
}: StatisticUsersAwardsProps): JSX.Element => {
  // let countAll = users.length;
  // let countWithAward = users.filter((user) => user.awards.length > 0).length;
  // let countWithAwardPercent = Math.ceil((countWithAward * 100) / countAll);
  // let countWithoutAward = users.filter(
  //   (user) => user.awards.length == 0
  // ).length;
  // let countWithoutAwardPercent = Math.floor(
  //   (countWithoutAward * 100) / countAll
  // );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l' className={styles.title}>
        Призеры
      </P>

      {/* <DoughnutCircle
        className={styles.doughnut}
        dataOne={countWithAward}
        colorOne='#E5F23B'
        dataTwo={countWithoutAward}
        colorTwo='rgba(57, 57, 57, 1)'
      />
      <div className={styles.description}>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotFemale}></div>
            <P size='l' color='gray'>
              Без наград
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countWithoutAward}
            </P>
            <P size='s' className={styles.percent}>
              {countWithoutAwardPercent}%
            </P>
          </div>
        </div>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotMale}></div>
            <P size='l' color='gray'>
              С наградами
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countWithAward}
            </P>
            <P size='s' className={styles.percent}>
              {countWithAwardPercent}%
            </P>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default StatisticUsersAwards;
