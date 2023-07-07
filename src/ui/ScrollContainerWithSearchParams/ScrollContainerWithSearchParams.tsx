import styles from './ScrollContainerWithSearchParams.module.scss';
import cn from 'classnames';
import { ScrollContainerWithSearchParamsProps } from './ScrollContainerWithSearchParams.props';
import Search from '../Search/Search';

const ScrollContainerWithSearchParams = ({
  searchHandleChange,
  className,
  children,
  ...props
}: ScrollContainerWithSearchParamsProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.header}>
        <Search
          onChange={searchHandleChange}
          color='white'
          search={true}
          button={false}
          placeholder='Поиск...'
          className={styles.search}
        />
      </div>
      <div className={styles.wrapperContent}>{children}</div>
      <div className={styles.footer}></div>
    </div>
  );
};
export default ScrollContainerWithSearchParams;
