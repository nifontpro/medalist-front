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
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import Htag from '@/ui/Htag/Htag';
import { memo } from 'react';

const EventDepartment = ({
  id,
  children,
  className,
  ...props
}: EventDepartmentProps): JSX.Element => {
  const { eventsDepartment, isLoadingEventsDepartment } = useEventAdmin(id);

  if (isLoadingEventsDepartment) return <Spinner />;
  if (!eventsDepartment?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <>
      {eventsDepartment &&
        eventsDepartment.data &&
        eventsDepartment.data?.length > 0 && (
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
        )}
    </>
  );
};
export default memo(EventDepartment)
