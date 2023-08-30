import styles from './ScrollContainerWithSearchParams.module.scss';
import cn from 'classnames';
import { ScrollContainerWithSearchParamsProps } from './ScrollContainerWithSearchParams.props';
import Search from '../Search/Search';
import SelectCalendarRange from '../SelectCalendarRange/SelectCalendarRange';
import SortButton from '../SortButton/SortButton';
import { memo, useCallback } from 'react';

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
  const handleSort = useCallback(() => {
    if (setState) state == 'ASC' ? setState('DESC') : setState('ASC');
  }, [setState, state]);

  return (
    <div className={cn(styles.wrapper)} {...props}>
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
              onClick={handleSort}
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
      <div className={cn(styles.wrapperContent, className)}>{children}</div>
      <div className={styles.footer}></div>
    </div>
  );
};
export default memo(ScrollContainerWithSearchParams);
