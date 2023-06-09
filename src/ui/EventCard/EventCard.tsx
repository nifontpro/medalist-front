'use client';

import dayjs from 'dayjs';
import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.props';
import { ImageDefault } from '../ImageDefault/ImageDefault';
import P from '../P/P';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';

const EventCard = ({
  event,
  children,
  className,
  ...props
}: EventCardProps): JSX.Element => {
  let eventYear = dayjs(event.eventDate).get('year');
  let eventMonth = dayjs(event.eventDate).get('month') + 1;
  let evenDay = dayjs(event.eventDate).get('date');

  // id: number;
  // eventDate: number; // Дата события
  // days: number; // Сколько прошло дней от начала года до события
  // eventName: string;
  // entityName: string; // ???
  // imageUrl?: string;
  // userId: number;
  // deptId: number;
  // deptName: string;
  // deptClassname?: string; // ???

  console.log(event);

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={event.imageUrl}
          width={100}
          height={100}
          alt='preview image'
          objectFit='cover'
          className='rounded-[10px]'
        />
      </div>
      <div className={styles.content}>

        <div className={styles.contentHeader}>
          <P size='xs'>{event.eventName}</P>
          <P fontstyle='thin' size='xs'>
            {`Дата: ${evenDay < 10 ? 0 : ''}${evenDay}.${
              eventMonth < 10 ? 0 : ''
            }${eventMonth}.${eventYear}`}
          </P>
        </div>

        <div className={styles.contentFooter}>
          <P size='xs' color='gray96' fontstyle='thin' className={styles.date}>
            Было
            <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
              {event.days} {}
              {declOfNum(event.days, ['день', 'дня', 'дней'])} назад
            </ButtonIcon>
          </P>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
