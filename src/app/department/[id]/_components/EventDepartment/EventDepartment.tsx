'use client';

import styles from './EventDepartment.module.scss';
import { EventDepartmentProps } from './EventDepartment.props';
import Spinner from '@/ui/Spinner/Spinner';
import EventCard from '@/ui/EventCard/EventCard';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import Htag from '@/ui/Htag/Htag';
import { memo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { eventApi } from '@/api/event/event.api';

const EventDepartment = ({
  id,
  children,
  className,
  ...props
}: EventDepartmentProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить все события отдела
  const { data: eventsDepartment, isLoading: isLoadingEventsDepartment } =
    eventApi.useGetByDeptQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  if (isLoadingEventsDepartment) return <Spinner />;
  // if (!eventsDepartment?.success) {
  //   return <NoAccessError errors={eventsDepartment?.errors} />;
  // }

  return (
    <>
      {eventsDepartment?.data && eventsDepartment.data?.length > 0 ? (
        <div className={styles.eventWrapper} {...props}>
          <div></div>
          <div>
            <Htag tag='h3'>События</Htag>

            <ScrollContainerWithSearchParams search={false}>
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
              </div>
            </ScrollContainerWithSearchParams>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(EventDepartment);
