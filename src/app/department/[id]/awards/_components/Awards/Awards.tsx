'use client';

import uniqid from 'uniqid';
import cn from 'classnames';
import { AwardsProps } from './Awards.props';
import { useRouter } from 'next/navigation';
import { useAwards } from './useAwards';
import styles from './Awards.module.scss'
import Htag from '@/ui/Htag/Htag';
import AuthComponent from '@/store/providers/AuthComponent';

const Awards = ({ users, id, className, ...props }: AwardsProps) => {
  const { push } = useRouter();
  const {
    awardsFull,
    isFetching,
    allAwards,
    allNominee,
    active,
    setActive,
    state,
    setState,
    arr,
    filteredValue,
    handleNextPage,
  } = useAwards();

  return (
    <div {...props} className={styles.wrapper}>
      <div className={styles.headerTitle}>
        <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>
        <AuthComponent minRole={'ADMIN'}>
          <div className={styles.createAwardAdaptive}>
            <ButtonCircleIcon
              onClick={() => push(getAwardCreateUrl())}
              appearance='black'
              icon='plus'
            >
              Создать
            </ButtonCircleIcon>
          </div>
        </AuthComponent>
      </div>

      {awardsFull && allAwards && allNominee && (
        <div className={styles.header}>
          <TabTitle
            active={active}
            setActive={setActive}
            count={arr.length}
            onClickActive={''}
            className={styles.all}
          >
            Все
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allAwards.length}
            onClickActive={'AWARD'}
            className={styles.award}
          >
            Награды
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allNominee.length}
            onClickActive={'NOMINEE'}
            className={styles.nominee}
          >
            Номинации
          </TabTitle>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>

          <AuthComponent minRole={'director'}>
            <div className={styles.createAward}>
              <ButtonCircleIcon
                onClick={() => push(getAwardCreateUrl())}
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
        allNominee={allNominee}
        allAwards={allAwards}
        awardsFull={arr}
      />

      <div className={styles.cards}>
        {filteredValue?.map((item) => {
          return (
            <Link key={uniqid()} href={'/award/' + item.id}>
              <a>
                <SingleAward layout award={item} />
              </a>
            </Link>
          );
        })}
      </div>
      <SpinnerSmallBtnPagination
        isFetching={isFetching}
        handleNextPage={handleNextPage}
        content={awardsFull}
        startDate={10000000}
        endDate={16732673054000}
        searchValue={''}
        btnSubmitTitle={'Показать еще'}
        btnEndTitle={'Показаны все награды'}
        className={styles.spinnerSmallBtnPagination}
      />

      <ButtonScrollUp />
    </div>
  );
};

export default Awards;
