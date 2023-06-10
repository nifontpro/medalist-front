'use client';

import styles from './EventDepartment.module.scss';
import { EventDepartmentProps } from './EventDepartment.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useEventAdmin } from '@/api/event/useEventAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import EventCard from '@/ui/EventCard/EventCard';

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
  const pageSize: number = 10;
  const { allEvent, isLoadingAllEvent } = useEventAdmin(id, {
    orders: [{ field: '(days)', direction: 'DESC' }],
    subdepts: true,
    page: page,
    pageSize,
  });
  const totalPage = allEvent?.pageInfo?.totalPages;

  if (isLoadingAllEvent) return <Spinner />;
  if (!allEvent?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {allEvent && allEvent.data && allEvent.data?.length > 0 && (
        <div className={styles.eventWrapper} {...props}>
          <div></div>
          <div className={styles.eventContent}>
            {allEvent.data &&
              allEvent.data.map((event) => {
                return <EventCard key={event.id} event={event}/>;
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
export default EventDepartment;
