import styles from './SpinnerFetching.module.scss';
import cn from 'classnames';
import { SpinnerFetchingProps } from './SpinnerFetching.props';

const SpinnerFetching = ({
  main = false,
  className,
  ...props
}: SpinnerFetchingProps): JSX.Element => {
  return (
    <div className={cn(className, styles.wrapper, {
      [styles.wrapperMain]: main
    })} {...props}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
        <div className={styles.dot3}></div>
      </div>
    </div>
  );
};
export default SpinnerFetching;
