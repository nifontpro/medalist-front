import styles from './StatisticCountNominee.module.scss';
import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import P from '@/ui/P/P';
import { memo } from 'react';

const StatisticCountNominee = ({
  colNomineeOnDepartment,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Номинации
            </P>
            <P size='xl'>
              {colNomineeOnDepartment?.data?.future! +
                colNomineeOnDepartment?.data?.nominee!}
            </P>
          </div>
        </div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default memo(StatisticCountNominee);

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
