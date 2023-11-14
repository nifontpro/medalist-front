'use client';

import { PurchaseHistoryProps } from './PurchaseHistory.props';
import styles from './PurchaseHistory.module.scss';
import cn from 'classnames';
import { usePurchaseHistory } from './usePurchaseHistory';
import { memo } from 'react';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import PurchaseHistoryTitle from './PurchaseHistoryTitle/PurchaseHistoryTitle';
import Htag from '@/ui/Htag/Htag';
import uniqid from 'uniqid';
import TabTitleHistory from '@/ui/TabTitleHistory/TabTitleHistory';
import SortButton from '@/ui/SortButton/SortButton';
import SelectCalendarRange from '@/ui/SelectCalendarRange/SelectCalendarRange';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import FilterHistory from './FilterHistory/FilterHistory';
import PurchaseHistoryCard from './PurchaseHistoryCard/PurchaseHistoryCard';

export const PurchaseHistory = ({ id }: PurchaseHistoryProps) => {
  const {
    gifts,
    isLoadingGifts,
    setPayCode,
    payCode,
    handleSort,
    state,
    setStartDateChange,
    setEndDateChange,
    totalPage,
    prevPage,
    page,
    nextPage,
    setState,
  } = usePurchaseHistory(id);
  console.log(gifts);

  if (isLoadingGifts) return <Spinner />;
  if (!gifts?.success) return <NoAccess errors={gifts?.errors} />;

  return (
    <main>
      <PurchaseHistoryTitle id={id} />
      <div className={styles.headerTitle}>
        <Htag tag='h2' className={styles.headTitle}>
          История покупок
        </Htag>
      </div>

      <div className={styles.header}>
        <TabTitleHistory
          key={uniqid()}
          onClickActive={'UNDEF'}
          setPayCode={setPayCode}
          payCode={payCode}
        >
          Все
        </TabTitleHistory>
        <TabTitleHistory
          key={uniqid()}
          onClickActive={'PAY'}
          setPayCode={setPayCode}
          payCode={payCode}
        >
          Еще не выданы
        </TabTitleHistory>
        <TabTitleHistory
          key={uniqid()}
          onClickActive={'GIVEN'}
          setPayCode={setPayCode}
          payCode={payCode}
        >
          Получены
        </TabTitleHistory>
        <TabTitleHistory
          key={uniqid()}
          onClickActive={'RETURN'}
          setPayCode={setPayCode}
          payCode={payCode}
        >
          Возвращены
        </TabTitleHistory>

        <SortButton state={state} onClick={handleSort} className={styles.sort}>
          Сначала новые
        </SortButton>

        <SelectCalendarRange
          setStartDateChange={setStartDateChange}
          setEndDateChange={setEndDateChange}
        />
      </div>

      <FilterHistory
        setPayCode={setPayCode}
        payCode={payCode}
        state={state}
        setState={setState}
        setStartDateChange={setStartDateChange}
        setEndDateChange={setEndDateChange}
      />

      <div className={styles.cards}>
        {gifts.data && gifts.data.length > 0 ? (
          gifts.data?.map((gift) => {
            return (
              <PurchaseHistoryCard
                key={uniqid()}
                layout
                gift={gift}
                className='historyCard'
              />
            );
          })
        ) : (
          <div>Нет истории</div>
        )}
      </div>

      {totalPage && totalPage > 1 ? (
        <PrevNextPages
          startPage={page + 1}
          endPage={totalPage}
          handleNextClick={() => gifts && nextPage(gifts)}
          handlePrevClick={prevPage}
        />
      ) : null}

      {totalPage === page + 1 && <ButtonScrollUp />}
    </main>
  );
};

export default memo(PurchaseHistory);
