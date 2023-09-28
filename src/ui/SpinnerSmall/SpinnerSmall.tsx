import styles from './SpinnerSmall.module.scss';
import cn from 'classnames';
import { SpinnerSmallProps } from './SpinnerSmall.props';
import { memo } from 'react';

const SpinnerSmall = ({
  position = 'center',
  className,
  ...props
}: SpinnerSmallProps): JSX.Element => {
  return (
    <div
      className={cn(styles.wrapper, className, {
        [styles.start]: position == 'start',
        [styles.center]: position == 'center',
        [styles.end]: position == 'end',
      })}
      {...props}
    >
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
    </div>
  );
};
export default memo(SpinnerSmall);
