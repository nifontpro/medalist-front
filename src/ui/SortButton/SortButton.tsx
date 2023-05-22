import styles from './SortButton.module.scss';
import cn from 'classnames';
import { SortButtonProps } from './SortButton.props';
import SortIcon from '@/icons/sort.svg';

const SortButton = ({
  state,
  className,
  children,
  ...props
}: SortButtonProps): JSX.Element => {
  return (
    <div className={cn(className, styles.container)} {...props}>
      <SortIcon
        className={cn({
          [styles.rotate]: state == 'DESC',
        })}
      />
      <span className={styles.title}>{children}</span>
    </div>
  );
};
export default SortButton;
