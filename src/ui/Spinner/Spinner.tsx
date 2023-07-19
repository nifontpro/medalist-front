import styles from './Spinner.module.scss';
import cn from 'classnames';
import { SpinnerProps } from './Spinner.props';
import { memo } from 'react';

const Spinner = ({ className, ...props }: SpinnerProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
    </div>
  );
};
export default memo(Spinner);
