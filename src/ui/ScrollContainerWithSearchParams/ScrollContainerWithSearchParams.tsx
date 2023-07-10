import styles from './ScrollContainerWithSearchParams.module.scss';
import cn from 'classnames';
import { ScrollContainerWithSearchParamsProps } from './ScrollContainerWithSearchParams.props';
import Search from '../Search/Search';
import SelectCalendarRange from '../SelectCalendarRange/SelectCalendarRange';
import SortButton from '../SortButton/SortButton';

const ScrollContainerWithSearchParams = ({
  searchHandleChange,
  className,
  search = true,
  setEndDateChange,
  setStartDateChange,
  state,
  setState,
  children,
  ...props
}: ScrollContainerWithSearchParamsProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.header}>
        {search && searchHandleChange && (
          <Search
            onChange={searchHandleChange}
            color='white'
            search={true}
            button={false}
            placeholder='Поиск...'
            className={styles.search}
          />
        )}

        {setEndDateChange && setStartDateChange && state && setState && (
          <div className={styles.filterWrapper}>
            <SortButton
              state={state}
              onClick={() =>
                state == 'ASC' ? setState('DESC') : setState('ASC')
              }
              className={styles.sort}
            >
              Сначала новые
            </SortButton>
            <SelectCalendarRange
              setStartDateChange={setStartDateChange}
              setEndDateChange={setEndDateChange}
            />
          </div>
        )}
      </div>
      <div className={styles.wrapperContent}>{children}</div>
      <div className={styles.footer}></div>
    </div>
  );
};
export default ScrollContainerWithSearchParams;
