'use client';

import uniqid from 'uniqid';
import { AwardsProps } from './Awards.props';
import { useAwards } from './useAwards';
import styles from './Awards.module.scss';
import Htag from '@/ui/Htag/Htag';
import AuthComponent from '@/store/providers/AuthComponent';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import TabTitle from '@/ui/TabTitle/TabTitle';
import SortButton from '@/ui/SortButton/SortButton';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import Award from './Award/Award';
import Spinner from '@/ui/Spinner/Spinner';
import FilterAwards from './FilterAwards/FilterAwards';
import { memo } from 'react';
import SwitchDepartOnCompany from '@/ui/SwitchDepartOnCompany/SwitchDepartOnCompany';
import cn from 'classnames';
import NoAccessError from '@/ui/ErrorPages/NoAccessError/NoAccessError';

const Awards = ({ id, className, ...props }: AwardsProps) => {
  const {
    active,
    setActive,
    state,
    setState,
    isLoadingAwardsOnDept,
    awardsOnDepartment,
    totalPage,
    page,
    setPage,
    nextPage,
    prevPage,
    awardCreateLink,
    handleSort,
    awardLink,
  } = useAwards(id);

  if (isLoadingAwardsOnDept) return <Spinner />;
  if (!awardsOnDepartment?.success)
    return <NoAccessError errors={awardsOnDepartment?.errors} />;

  if (awardsOnDepartment && awardsOnDepartment.data) {
    return (
      <div {...props} className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>
          {/* <SwitchDepartOnCompany /> */}
          <AuthComponent minRole={'ADMIN'}>
            <div className={styles.createAwardAdaptive}>
              <ButtonCircleIcon
                onClick={awardCreateLink}
                classNameForIcon='@apply w-[12px] h-[12px]'
                appearance='black'
                icon='plus'
              >
                Создать
              </ButtonCircleIcon>
            </div>
          </AuthComponent>
        </div>

        {/* {awardsOnDepartment.data ? (
          <>
            <Htag
              tag='h3'
              // color='gray'
              onClick={() => {
                setActive(undefined);
                setPage(0);
              }}
              className={cn(styles.award, {
                [styles.active]: active === undefined,
              })}
            >
              ALL
            </Htag>
            <div
              onClick={() => setActive('FINISH')}
              className={cn({
                ['text-red-400']: active === 'FINISH',
              })}
            >
              FINISH
            </div>
            <div
              onClick={() => setActive('NOMINEE')}
              className={cn({
                ['text-red-400']: active === 'NOMINEE',
              })}
            >
              NOMINEE
            </div>
          </>
        ) : null} */}

        {awardsOnDepartment.data ? (
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
              Завершенные
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
            <SortButton
              state={state}
              onClick={handleSort}
              className={styles.sort}
            >
              Сначала новые
            </SortButton>

            <AuthComponent minRole={'ADMIN'}>
              <div className={styles.createAward}>
                <ButtonCircleIcon
                  onClick={awardCreateLink}
                  classNameForIcon='@apply w-[12px] h-[12px]'
                  appearance='black'
                  icon='plus'
                >
                  Создать награду
                </ButtonCircleIcon>
              </div>
            </AuthComponent>
          </div>
        ) : null}

        <FilterAwards
          state={state}
          setState={setState}
          active={active}
          setActive={setActive}
          awardsFull={awardsOnDepartment.data}
        />

        <div className={styles.cards}>
          {awardsOnDepartment.data.length > 0 ? (
            awardsOnDepartment.data?.map((item) => {
              return (
                <Award
                  key={uniqid()}
                  layout
                  award={item}
                  onClick={() => awardLink(item.id)}
                  className='awardCard'
                />
              );
            })
          ) : (
            <div>Еще нет наград</div>
          )}
        </div>
        {/* {totalPage && totalPage > 1 ? (
          <PrevNextPages
            startPage={page + 1}
            endPage={totalPage}
            handleNextClick={() =>
              awardsOnDepartment && nextPage(awardsOnDepartment)
            }
            handlePrevClick={prevPage}
          />
        ) : null} */}

        {totalPage === page + 1 && <ButtonScrollUp />}
      </div>
    );
  } else {
    return null;
  }
};

export default memo(Awards);
