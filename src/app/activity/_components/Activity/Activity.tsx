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
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import SingleActivity from './SingleActivity/SingleActivity';
import FilterActivity from './FilterActivity/FilterActivity';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import SelectCalendar from '@/ui/SelectCalendar/SelectCalendar';
import dayjs from 'dayjs';
import SelectCalendarRange from '@/ui/SelectCalendarRange/SelectCalendarRange';

const Activity = ({ className, ...props }: ActivityProps): JSX.Element => {
  const {
    state,
    setState,
    active,
    setActive,
    searchValue,
    setSearchValue,
    searchHandleChange,
    setPage,
    page,
    typeOfUser,
    nextPage,
    prevPage,
    windowSize,
    totalPage,
    awardsActivOnDepartment,
    back,
    setStartDateChange,
    setEndDateChange,
  } = useActivity();

  return (
    <div {...props} className={styles.wrapper}>
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>

      <Htag tag='h2' className={styles.headTitle}>
        Активность
      </Htag>

      <FilterActivity
        active={active}
        setActive={setActive}
        state={state}
        setState={setState}
        setStartDateChange={setStartDateChange}
        setEndDateChange={setEndDateChange}
      />

      <div className={styles.header}>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          onClickActive={undefined}
          className={styles.all}
        >
          Все
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          onClickActive={'FINISH'}
          className={styles.award}
        >
          Медали
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          onClickActive={'NOMINEE'}
          className={styles.nominee}
        >
          Номинации
        </TabTitle>
        <TabTitle
          setPage={setPage}
          active={active}
          setActive={setActive}
          onClickActive={'FUTURE'}
          className={styles.other}
        >
          Скоро
        </TabTitle>

        <SortButton
          state={state}
          onClick={() => (state == 'ASC' ? setState('DESC') : setState('ASC'))}
          className={styles.sort}
        >
          Сначала новые
        </SortButton>

        <SelectCalendarRange
          setStartDateChange={setStartDateChange}
          setEndDateChange={setEndDateChange}
        />
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

        {awardsActivOnDepartment?.data?.map((item) => {
          return (
            <SingleActivity
              activity={item}
              key={uniqid()}
              className={styles.activity}
            />
          );
        })}
      </div>

      {totalPage && totalPage > 1 ? (
        <PrevNextPages
          startPage={page + 1}
          endPage={totalPage}
          handleNextClick={() =>
            awardsActivOnDepartment && nextPage(awardsActivOnDepartment)
          }
          handlePrevClick={prevPage}
        />
      ) : null}
      <ButtonScrollUp className='@apply mt-[50px]' />
    </div>
  );
};

export default Activity;
