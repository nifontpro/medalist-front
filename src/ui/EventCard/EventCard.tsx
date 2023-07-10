'use client';

import styles from './EventCard.module.scss';
import { EventCardProps } from './EventCard.props';
import { ImageDefault } from '../ImageDefault/ImageDefault';
import P from '../P/P';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import cn from 'classnames';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import AuthComponent from '@/store/providers/AuthComponent';
import { useEventCard } from './useEventCard';

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
export default EventCard;

// 'use client';

// import styles from './EventCard.module.scss';
// import { EventCardProps } from './EventCard.props';
// import { ImageDefault } from '../ImageDefault/ImageDefault';
// import P from '../P/P';
// import ButtonIcon from '../ButtonIcon/ButtonIcon';
// import { declOfNum } from '@/utils/declOfNum';
// import cn from 'classnames';
// import ButtonEdit from '../ButtonEdit/ButtonEdit';
// import AuthComponent from '@/store/providers/AuthComponent';
// import { useEventCard } from './useEventCard';

// const EventCard = ({
//   event,
//   remove,
//   children,
//   className,
//   ...props
// }: EventCardProps): JSX.Element => {
//   const {
//     instanceOfBaseEvent,
//     eventYear,
//     eventMonth,
//     evenDay,
//     colDaysSinceEventDate,
//     numberDaysForEvent,
//     deleteDepartmentEventAsync,
//     deleteUserEventAsync,
//   } = useEventCard(event);

//   return (
//     <div className={styles.wrapper} {...props}>
//       {instanceOfBaseEvent(event) && (
//         <div className={styles.img}>
//           <ImageDefault
//             src={event.imageUrl}
//             width={100}
//             height={100}
//             alt='preview image'
//             className='rounded-[10px]'
//           />
//         </div>
//       )}
//       <div className={styles.content}>
//         <div className={styles.contentHeader}>
//           {instanceOfBaseEvent(event) && event.entityName && (
//             <P size='xs' className={styles.title}>
//               {event.entityName}
//             </P>
//           )}
//           {/* <P size='xs'>{event.eventName}</P> */}
//           <P fontstyle='thin' size='xs'>
//             {`${evenDay < 10 ? 0 : ''}${evenDay}.${
//               eventMonth < 10 ? 0 : ''
//             }${eventMonth}.${eventYear}: ${event.eventName}`}
//           </P>
//         </div>

//         <div className={styles.contentFooter}>
//           <P
//             size='xs'
//             color='gray96'
//             fontstyle='thin'
//             className={cn(styles.date, styles.date1)}
//           >
//             {colDaysSinceEventDate >= 0
//               ? declOfNum(colDaysSinceEventDate, ['Прошел', 'Прошло', 'Прошло'])
//               : 'Еще'}
//             <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
//               {colDaysSinceEventDate >= 0
//                 ? colDaysSinceEventDate
//                 : -colDaysSinceEventDate}{' '}
//               {colDaysSinceEventDate >= 0
//                 ? declOfNum(colDaysSinceEventDate, ['день', 'дня', 'дней'])
//                 : declOfNum(colDaysSinceEventDate * -1, [
//                     'день',
//                     'дня',
//                     'дней',
//                   ])}
//             </ButtonIcon>
//           </P>
//           <P
//             size='xs'
//             color='gray96'
//             fontstyle='thin'
//             className={cn(styles.date, styles.date2)}
//           >
//             {declOfNum(numberDaysForEvent, ['Остался', 'Осталось', 'Осталось'])}
//             <ButtonIcon className={styles.btnIcon} appearance='graySilver'>
//               {numberDaysForEvent}{' '}
//               {declOfNum(numberDaysForEvent, ['день', 'дня', 'дней'])}
//             </ButtonIcon>
//           </P>
//         </div>
//       </div>

//       {remove === 'DEPT' ? (
//         <AuthComponent minRole='ADMIN'>
//           <ButtonEdit
//             icon='remove'
//             className={styles.remove}
//             onClick={() => deleteDepartmentEventAsync(event.id)}
//           />
//         </AuthComponent>
//       ) : remove === 'USER' ? (
//         <AuthComponent minRole='ADMIN'>
//           <ButtonEdit
//             icon='remove'
//             className={styles.remove}
//             onClick={() => deleteUserEventAsync(event.id)}
//           />
//         </AuthComponent>
//       ) : null}
//     </div>
//   );
// };
// export default EventCard;
