import styles from './SpinnerSmall.module.scss';
import cn from 'classnames';
import { SpinnerSmallProps } from './SpinnerSmall.props';

const SpinnerSmall = ({
  className,
  ...props
}: SpinnerSmallProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
    </div>
  );
};
export default SpinnerSmall;
