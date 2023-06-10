'use client';

import dayjs from 'dayjs';
import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.props';
import { ImageDefault } from '../ImageDefault/ImageDefault';
import P from '../P/P';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import cn from 'classnames';

const EventCard = ({
  event,
  children,
  className,
  ...props
}: EventCardProps): JSX.Element => {
  let nowDays = +new Date();

  let eventYear = dayjs(event.eventDate).get('year');
  let eventMonth = dayjs(event.eventDate).get('month') + 1;
  let evenDay = dayjs(event.eventDate).get('date');

  let setNYDate = +new Date(`Jan 01 ${dayjs(nowDays).get('year')} 00:00:00`);
  let colDaysSinceNY = Math.floor((nowDays - setNYDate) / 1000 / 60 / 60 / 24);

  let numberDaysForEvent = event.days - colDaysSinceNY;

  let colDaysSinceEventDate = Math.floor(
    (nowDays - event.eventDate) / 1000 / 60 / 60 / 24
  );

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={event.imageUrl}
          width={100}
          height={100}
          alt='preview image'
          // objectFit='cover'
          className='rounded-[10px]'
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <P size='xs' className={styles.title}>
            {event.entityName}
          </P>
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
                : colDaysSinceEventDate * -1}{' '}
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
            {numberDaysForEvent >= 0
              ? declOfNum(numberDaysForEvent, [
                  'Остался',
                  'Осталось',
                  'Осталось',
                ])
              : declOfNum(numberDaysForEvent * -1, [
                  'Остался',
                  'Осталось',
                  'Осталось',
                ])}
            <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
              {numberDaysForEvent}{' '}
              {numberDaysForEvent >= 0
                ? declOfNum(numberDaysForEvent, ['день', 'дня', 'дней'])
                : declOfNum(numberDaysForEvent * -1, ['день', 'дня', 'дней'])}
            </ButtonIcon>
          </P>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
