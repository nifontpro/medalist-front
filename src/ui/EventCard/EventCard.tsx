'use client';

import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.props';
import ImageDefault from '../ImageDefault/ImageDefault';
import P from '../P/P';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import cn from 'classnames';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import AuthComponent from '@/store/providers/AuthComponent';
import { useEventCard } from './useEventCard';
import { memo } from 'react';

const EventCard = ({
  event,
  remove,
  children,
  className,
  ...props
}: EventCardProps): JSX.Element => {
  const {
    instanceOfBaseEvent,
    eventYear,
    eventMonth,
    evenDay,
    colDaysSinceEventDate,
    numberDaysForEvent,
    deleteDepartmentEventAsync,
    deleteUserEventAsync,
  } = useEventCard(event);

  return (
    <div className={styles.wrapper} {...props}>
      {instanceOfBaseEvent(event) && (
        <div className={styles.img}>
          <ImageDefault
            src={event.imageUrl}
            width={64}
            height={64}
            alt='preview image'
            className='rounded-[10px]'
          />
        </div>
      )}

      <div className={styles.info}>
        {instanceOfBaseEvent(event) && event.entityName && (
          <P size='xs' className={styles.title}>
            {event.entityName}
          </P>
        )}
        <P size='xs' fontstyle='thin' className={styles.title}>
          {event.eventName}
        </P>
      </div>

      <div className={styles.content}>
        <div className={styles.contentFooter}>
          <P
            size='xs'
            color='gray96'
            fontstyle='thin'
            className={cn(styles.date, styles.date2)}
          >
            {`Через ${numberDaysForEvent} ${declOfNum(numberDaysForEvent, [
              'день',
              'дня',
              'дней',
            ])}`}
          </P>

          <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
            {`${evenDay < 10 ? 0 : ''}${evenDay}.${
              eventMonth < 10 ? 0 : ''
            }${eventMonth}.${eventYear}`}
          </ButtonIcon>
        </div>
      </div>

      <div className={styles.removeBtn}>
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
    </div>
  );
};
export default memo(EventCard);
