'use client';

import dayjs from 'dayjs';
import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.props';
import { ImageDefault } from '../ImageDefault/ImageDefault';
import P from '../P/P';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import cn from 'classnames';
import { BaseEvent } from '@/types/event/BaseEvent';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import AuthComponent from '@/store/providers/AuthComponent';
import { useEventAdmin } from '@/api/event/useEventAdmin';

const EventCard = ({
  event,
  remove,
  children,
  className,
  ...props
}: EventCardProps): JSX.Element => {
  let nowDays = +new Date();

  let eventYear = dayjs(event.eventDate).get('year');
  let eventMonth = dayjs(event.eventDate).get('month') + 1;
  let evenDay = dayjs(event.eventDate).get('date');

  let colDaysSinceNY = Math.floor(
    (nowDays - +new Date(`Jan 01 ${dayjs(nowDays).get('year')} 00:00:00`)) /
      86400000
  ); // Дней от НГ до текущей даты

  let colDaysUntilNY = Math.floor(
    (+new Date(`Jan 01 ${dayjs(nowDays).get('year') + 1} 00:00:00`) - nowDays) /
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

  const { deleteDepartmentEventAsync, deleteUserEventAsync } = useEventAdmin();

  return (
    <div className={styles.wrapper} {...props}>
      {instanceOfBaseEvent(event) && (
        <div className={styles.img}>
          <ImageDefault
            src={event.imageUrl}
            width={100}
            height={100}
            alt='preview image'
            className='rounded-[10px]'
          />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          {instanceOfBaseEvent(event) && event.entityName && (
            <P size='xs' className={styles.title}>
              {event.entityName}
            </P>
          )}
          {/* <P size='xs'>{event.eventName}</P> */}
          <P fontstyle='thin' size='xs'>
            {`${evenDay < 10 ? 0 : ''}${evenDay}.${
              eventMonth < 10 ? 0 : ''
            }${eventMonth}.${eventYear}: ${event.eventName}`}
          </P>
        </div>

        <div className={styles.contentFooter}>
          <P
            size='xs'
            color='gray96'
            fontstyle='thin'
            className={cn(styles.date, styles.date1)}
          >
            {colDaysSinceEventDate >= 0
              ? declOfNum(colDaysSinceEventDate, ['Прошел', 'Прошло', 'Прошло'])
              : 'Еще'}
            <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
              {colDaysSinceEventDate >= 0
                ? colDaysSinceEventDate
                : -colDaysSinceEventDate}{' '}
              {colDaysSinceEventDate >= 0
                ? declOfNum(colDaysSinceEventDate, ['день', 'дня', 'дней'])
                : declOfNum(colDaysSinceEventDate * -1, [
                    'день',
                    'дня',
                    'дней',
                  ])}
            </ButtonIcon>
          </P>
          <P
            size='xs'
            color='gray96'
            fontstyle='thin'
            className={cn(styles.date, styles.date2)}
          >
            {declOfNum(numberDaysForEvent, ['Остался', 'Осталось', 'Осталось'])}
            <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
              {numberDaysForEvent}{' '}
              {declOfNum(numberDaysForEvent, ['день', 'дня', 'дней'])}
            </ButtonIcon>
          </P>
        </div>
      </div>

      {remove === 'DEPT' ? (
        <AuthComponent minRole='ADMIN'>
          <ButtonEdit
            icon='remove'
            className={styles.remove}
            onClick={() => deleteDepartmentEventAsync(event.id)}
          />
        </AuthComponent>
      ) : remove === 'USER' ? (
        <AuthComponent minRole='ADMIN'>
          <ButtonEdit
            icon='remove'
            className={styles.remove}
            onClick={() => deleteUserEventAsync(event.id)}
          />
        </AuthComponent>
      ) : null}
    </div>
  );
};
export default EventCard;
