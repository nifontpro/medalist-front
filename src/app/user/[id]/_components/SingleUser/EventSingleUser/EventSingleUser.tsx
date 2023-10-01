'use client';

import styles from './EventSingleUser.module.scss';
import { EventSingleUserProps } from './EventSingleUser.props';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import EventCard from '@/ui/EventCard/EventCard';
import cn from 'classnames';
import Htag from '@/ui/Htag/Htag';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { memo } from 'react';
import { eventApi } from '@/api/event/event.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const EventSingleUser = ({
  id,
  children,
  className,
  ...props
}: EventSingleUserProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: eventsUser, isLoading: isLoadingEventsUser } =
    eventApi.useGetByUserQuery(
      {
        authId: typeOfUser?.id!,
        userId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  if (isLoadingEventsUser) return <Spinner />;
  if (!eventsUser?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {eventsUser && eventsUser.data && eventsUser.data?.length > 0 && (
        <div className={cn(styles.eventWrapper, className)} {...props}>
          <div></div>
          <div>
            <Htag tag='h3'>События</Htag>

            <ScrollContainerWithSearchParams search={false}>
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

                {/* {totalPage && totalPage > 1 ? (
                  <PrevNextPages
                    startPage={page + 1}
                    endPage={totalPage}
                    handleNextClick={() => eventsUser && nextPage(eventsUser)}
                    handlePrevClick={prevPage}
                  />
                ) : null} */}
              </div>
            </ScrollContainerWithSearchParams>
          </div>
          {/* <div className={styles.eventContent}>
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
          </div> */}
        </div>
      )}
    </>
  );
};
export default memo(EventSingleUser);
