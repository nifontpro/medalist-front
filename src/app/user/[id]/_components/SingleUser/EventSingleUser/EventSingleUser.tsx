'use client';

import styles from './EventSingleUser.module.scss';
import { EventSingleUserProps } from './EventSingleUser.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useEventAdmin } from '@/api/event/useEventAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import EventCard from '@/ui/EventCard/EventCard';
import cn from 'classnames';

const EventSingleUser = ({
  id,
  children,
  className,
  ...props
}: EventSingleUserProps): JSX.Element => {
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
  const pageSize: number = 100;

  const { eventsUser, isLoadingEventsUser } = useEventAdmin(id, {
    orders: [{ field: '(days)', direction: 'DESC' }],
    subdepts: true,
    page: page,
    pageSize,
  });

  const totalPage = eventsUser?.pageInfo?.totalPages;

  if (isLoadingEventsUser) return <Spinner />;
  if (!eventsUser?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {eventsUser &&
        eventsUser.data &&
        eventsUser.data?.length > 0 && (
          <div className={cn(styles.eventWrapper, className)} {...props}>
            <div></div>
            <div className={styles.eventContent}>
              {eventsUser.data &&
                eventsUser.data.map((eventsUser) => {
                  return (
                    <EventCard
                      key={eventsUser.id}
                      event={eventsUser}
                      remove={'USER'}
                    />
                  );
                })}

              {totalPage && totalPage > 1 ? (
                <PrevNextPages
                  startPage={page + 1}
                  endPage={totalPage}
                  handleNextClick={() =>
                    eventsUser && nextPage(eventsUser)
                  }
                  handlePrevClick={prevPage}
                />
              ) : null}
            </div>
          </div>
        )}
    </>
  );
};
export default EventSingleUser;
