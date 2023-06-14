'use client';

import styles from './EventDepartment.module.scss';
import { EventDepartmentProps } from './EventDepartment.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useEventAdmin } from '@/api/event/useEventAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import EventCard from '@/ui/EventCard/EventCard';
import cn from 'classnames';

const EventDepartment = ({
  id,
  children,
  className,
  ...props
}: EventDepartmentProps): JSX.Element => {
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

  const { eventsDepartment, isLoadingEventsDepartment } = useEventAdmin(id, {
    orders: [{ field: '(days)', direction: 'DESC' }],
    subdepts: true,
    page: page,
    pageSize,
  });

  const totalPage = eventsDepartment?.pageInfo?.totalPages;

  if (isLoadingEventsDepartment) return <Spinner />;
  if (!eventsDepartment?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {eventsDepartment &&
        eventsDepartment.data &&
        eventsDepartment.data?.length > 0 && (
          <div className={cn(styles.eventWrapper, className)} {...props}>
            <div></div>
            <div className={styles.eventContent}>
              {eventsDepartment.data &&
                eventsDepartment.data.map((eventDepartment) => {
                  return (
                    <EventCard
                      key={eventDepartment.id}
                      event={eventDepartment}
                      remove={'DEPT'}
                    />
                  );
                })}

              {totalPage && totalPage > 1 ? (
                <PrevNextPages
                  startPage={page + 1}
                  endPage={totalPage}
                  handleNextClick={() =>
                    eventsDepartment && nextPage(eventsDepartment)
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
export default EventDepartment;
