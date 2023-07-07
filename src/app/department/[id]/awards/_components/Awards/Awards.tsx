'use client';

import uniqid from 'uniqid';
import { AwardsProps } from './Awards.props';
import { useRouter } from 'next/navigation';
import { useAwards } from './useAwards';
import styles from './Awards.module.scss';
import Htag from '@/ui/Htag/Htag';
import AuthComponent from '@/store/providers/AuthComponent';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { getAwardCreateUrl } from '@/config/api.config';
import TabTitle from '@/ui/TabTitle/TabTitle';
import SortButton from '@/ui/SortButton/SortButton';
import Link from 'next/link';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import Award from './Award/Award';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import FilterAwards from './FilterAwards/FilterAwards';

const Awards = ({ id, className, ...props }: AwardsProps) => {
  const { push } = useRouter();
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
  } = useAwards(id);

  if (isLoadingAwardsOnDept) return <Spinner />;
  if (!awardsOnDepartment?.success) return <NoAccess button={false} />;

  if (awardsOnDepartment && awardsOnDepartment.data) {
    return (
      <div {...props} className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>
          <AuthComponent minRole={'ADMIN'}>
            <div className={styles.createAwardAdaptive}>
              <ButtonCircleIcon
                onClick={() => push(getAwardCreateUrl(`?deptId=${id}`))}
                classNameForIcon='@apply w-[12px] h-[12px]'
                appearance='black'
                icon='plus'
              >
                Создать
              </ButtonCircleIcon>
            </div>
          </AuthComponent>
        </div>

        {awardsOnDepartment.data && (
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
              onClick={() =>
                state == 'ASC' ? setState('DESC') : setState('ASC')
              }
              className={styles.sort}
            >
              Сначала новые
            </SortButton>

            <AuthComponent minRole={'ADMIN'}>
              <div className={styles.createAward}>
                <ButtonCircleIcon
                  onClick={() => push(getAwardCreateUrl(`?deptId=${id}`))}
                  classNameForIcon='@apply w-[12px] h-[12px]'
                  appearance='black'
                  icon='plus'
                >
                  Создать награду
                </ButtonCircleIcon>
              </div>
            </AuthComponent>
          </div>
        )}

        <FilterAwards
          state={state}
          setState={setState}
          active={active}
          setActive={setActive}
          // allNominee={allNominee}
          // allAwards={allAwards}
          awardsFull={awardsOnDepartment.data}
        />

        <div className={styles.cards}>
          {awardsOnDepartment.data.length > 0 ? (
            awardsOnDepartment.data?.map((item) => {
              return (
                <Link key={uniqid()} href={'/award/' + item.id}>
                  <Award layout award={item} />
                </Link>
              );
            })
          ) : (
            <div>Еще нет наград</div>
          )}
        </div>
        {totalPage && totalPage > 1 ? (
          <PrevNextPages
            startPage={page + 1}
            endPage={totalPage}
            handleNextClick={() =>
              awardsOnDepartment && nextPage(awardsOnDepartment)
            }
            handlePrevClick={prevPage}
          />
        ) : null}

        <ButtonScrollUp />
      </div>
    );
  } else {
    return null;
  }
};

export default Awards;
