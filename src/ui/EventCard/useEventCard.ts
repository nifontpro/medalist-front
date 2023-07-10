import { useEventAdmin } from '@/api/event/useEventAdmin';
import { BaseEvent, ShortEvent } from '@/types/event/BaseEvent';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const useEventCard = (event: BaseEvent | ShortEvent) => {
  const { deleteDepartmentEventAsync, deleteUserEventAsync } = useEventAdmin();

  return useMemo(() => {
    let nowDays = +new Date();

    let eventYear = dayjs(event.eventDate).get('year');
    let eventMonth = dayjs(event.eventDate).get('month') + 1;
    let evenDay = dayjs(event.eventDate).get('date');

    let colDaysSinceNY = Math.floor(
      (nowDays - +new Date(`Jan 01 ${dayjs(nowDays).get('year')} 00:00:00`)) /
        86400000
    ); // Дней от НГ до текущей даты

    let colDaysUntilNY = Math.floor(
      (+new Date(`Jan 01 ${dayjs(nowDays).get('year') + 1} 00:00:00`) -
        nowDays) /
        86400000
    ); // Дней от текущей даты до конца года

    let numberDaysForEvent =
      event.days < colDaysSinceNY
        ? colDaysUntilNY + event.days
        : event.days - colDaysSinceNY; // Кол дней до события. Если event.days меньше colDaysSinceNY нужно считать так - colDaysUntilNY + event.days. В противном случае event.days - colDaysSinceNY

    let colDaysSinceEventDate = Math.floor(
      (nowDays - event.eventDate) / 86400000
    ); // Дней от даты события начальной

    function instanceOfBaseEvent(object: any): object is BaseEvent {
      return true;
    } // Функция проверяющая тип события
    return {
      instanceOfBaseEvent,
      eventYear,
      eventMonth,
      evenDay,
      colDaysSinceEventDate,
      numberDaysForEvent,
      deleteDepartmentEventAsync,
      deleteUserEventAsync,
    };
  }, [event, deleteDepartmentEventAsync, deleteUserEventAsync]);
};
