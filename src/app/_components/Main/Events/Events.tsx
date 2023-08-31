'use client';

import styles from './Events.module.scss';
import { EventsProps } from './Events.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useEventAdmin } from '@/api/event/useEventAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import EventCard from '@/ui/EventCard/EventCard';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import cn from 'classnames';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import { memo, useMemo } from 'react';

const Events = ({
  deptId,
  children,
  className,
  ...props
}: EventsProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const switcher = useAppSelector((state) => state.switcher);

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();
  const pageSize: number = useMemo(() => 4, []);

  const { allEvent, isLoadingAllEvent } = useEventAdmin(
    deptId ? deptId : typeOfUser?.dept?.id,
    {
      orders: [{ field: '(days)', direction: 'DESC' }],
      subdepts: switcher,
      page: page,
      pageSize,
    }
  );

  const totalPage = useMemo(() => allEvent?.pageInfo?.totalPages, [allEvent]);

  if (isLoadingAllEvent) return <Spinner />;
  if (!allEvent?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {allEvent && allEvent.data && allEvent.data?.length > 0 && (
        <div className={cn(styles.eventWrapper, className)} {...props}>
          <Htag tag='h2' className={styles.header}>
            События
          </Htag>
          <div className={styles.eventContent}>
            {allEvent.data &&
              allEvent.data.map((event) => {
                return (
                  <EventCard key={uniqid()} event={event} remove={'FALSE'} />
                );
              })}

            {totalPage && totalPage > 1 ? (
              <PrevNextPages
                startPage={page + 1}
                endPage={totalPage}
                handleNextClick={() => allEvent && nextPage(allEvent)}
                handlePrevClick={prevPage}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
export default memo(Events);
