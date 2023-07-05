'use client';

import styles from './Activity.module.scss';
import { ActivityProps } from './Activity.props';
import { useActivity } from './useActivity';
// import SingleActivity from './SingleActivity/SingleActivity';
// import FilterActivity from './FilterActivity/FilterActivity';
import uniqid from 'uniqid';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import TabTitle from '@/ui/TabTitle/TabTitle';
import SortButton from '@/ui/SortButton/SortButton';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import Search from '@/ui/Search/Search';

const Activity = ({ className, ...props }: ActivityProps): JSX.Element => {
  const {
    state,
    setState,
    active,
    setActive,
    setSearchValue,
    searchHandleChange,
    setPage,
  } = useActivity();

  const { windowSize } = useWindowSize();

  return (
    <div {...props} className={styles.wrapper}>
      <Htag tag='h2' className={styles.headTitle}>
        Активность
      </Htag>

      {/* <FilterActivity
        active={active}
        setActive={setActive}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        state={state}
        setState={setState}
        allActivityLength={allActivityLength}
        awardsLength={awardsLength}
        nomineeLength={nomineeLength}
        otherLength={otherLength}
        startDate={startDate}
        endDate={endDate}
        setSizePage={setSizePage}
        setArr={setArr}
      /> */}

      <div className={styles.header}>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          count={1}
          onClickActive={undefined}
          className={styles.all}
        >
          Все
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          count={2}
          onClickActive={'FINISH'}
          className={styles.award}
        >
          Медали
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          count={3}
          onClickActive={'NOMINEE'}
          className={styles.nominee}
        >
          Номинации
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          count={4}
          onClickActive={'FUTURE'}
          className={styles.other}
        >
          Будущее
        </TabTitle>

        <SortButton
          state={state}
          onClick={() => (state == 'ASC' ? setState('DESC') : setState('ASC'))}
          className={styles.sort}
        >
          Сначала новые
        </SortButton>

        {/* <RangeCalendar
          placement='bottomLeft'
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          setSizePage={setSizePage}
          setArr={setArr}
        /> */}
      </div>

      <div className={styles.cards}>
        <Search
          onChange={searchHandleChange}
          placeholder={
            windowSize.winWidth < 768 ? 'Поиск...' : 'Фамилия, Имя, Отдел...'
          }
          color='white'
          button={false}
          search={true}
          className={styles.search}
        />

        {/* {filteredValue?.map((item) => {
          return (
            <SingleActivity
              activity={item}
              key={uniqid()}
              className={styles.activity}
            />
          );
        })} */}

        {/* <SpinnerSmallBtnPagination
          isFetching={isFetching}
          handleNextPage={handleNextPage}
          content={activity}
          searchValue={searchValue}
          startDate={startDate}
          endDate={endDate}
          btnSubmitTitle={'Показать еще'}
          btnEndTitle={'Показана вся активность'}
        /> */}
      </div>
      <ButtonScrollUp />
    </div>
  );
};

export default Activity;
