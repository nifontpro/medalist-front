import styles from './Wrapper.module.scss';
import cn from 'classnames';
import { WrapperProps } from './Wrapper.props';
import { memo } from 'react';

const Wrapper = ({
  children,
  className,
  ...props
}: WrapperProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {children}
    </div>
  );
};
export default memo(Wrapper);
