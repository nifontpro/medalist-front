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
import { memo, useState } from 'react';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

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

  const [openModalConfirmForUser, setOpenModalConfirmForUser] = useState(false);
  const [openModalConfirmForDept, setOpenModalConfirmForDept] = useState(false);

  return (
    <>
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
                onClick={() => setOpenModalConfirmForDept(true)}
              />
            </AuthComponent>
          ) : remove === 'USER' ? (
            <AuthComponent minRole='ADMIN'>
              <ButtonEdit
                icon='remove'
                className={styles.remove}
                onClick={() => setOpenModalConfirmForUser(true)}
              />
            </AuthComponent>
          ) : null}
        </div>
      </div>

      <ModalConfirm
        key={'forDept'}
        title={'Требуется подтверждение!'}
        textBtn={'Удалить'}
        text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить событие отдела "${event.eventName}"?`}
        openModalConfirm={openModalConfirmForDept}
        setOpenModalConfirm={setOpenModalConfirmForDept}
        onConfirm={() => deleteDepartmentEventAsync(event.id)}
      />

      <ModalConfirm
        key={'forUser'}
        title={'Требуется подтверждение!'}
        textBtn={'Удалить'}
        text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить событие пользователя "${event.eventName}"?`}
        openModalConfirm={openModalConfirmForUser}
        setOpenModalConfirm={setOpenModalConfirmForUser}
        onConfirm={() => deleteUserEventAsync(event.id)}
      />
    </>
  );
};
export default memo(EventCard);
