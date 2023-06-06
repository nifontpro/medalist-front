import styles from './SpinnerFetching.module.scss';
import cn from 'classnames';
import { SpinnerFetchingProps } from './SpinnerFetching.props';
import {  motion } from 'framer-motion';

const SpinnerFetching = ({
  main = false,
  className,
  ...props
}: SpinnerFetchingProps): JSX.Element => {
  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variants}
      transition={{ duration: 0.4 }}
      className={cn(className, styles.wrapper, {
        [styles.wrapperMain]: main,
      })}
      {...props}
    >
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
        <div className={styles.dot3}></div>
      </div>
    </motion.div>
  );
};
export default SpinnerFetching;
