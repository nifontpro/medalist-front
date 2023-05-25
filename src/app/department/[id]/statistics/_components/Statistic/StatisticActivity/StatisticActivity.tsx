import styles from './StatisticActivity.module.scss';
import { StatisticActivityProps } from './StatisticActivity.props';
import cn from 'classnames';
import { useStatisticActivity } from './useStatisticActivity';
import Link from 'next/link';
import VerticalBarChart from '@/ui/VerticalBarChart/VerticalBarChart';
import P from '@/ui/P/P';

const StatisticActivity = ({
  departId,
  className,
  ...props
}: StatisticActivityProps): JSX.Element => {
  // const { objNominees, objAwards } = useStatisticActivity(yearActivity);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Link href='/activity' className={styles.link}>
        <P size='l'>Активность</P>
      </Link>
      <div>
        {/* <VerticalBarChart objNominees={objNominees} objAwards={objAwards} /> */}
      </div>
    </div>
  );
};

export default StatisticActivity;
