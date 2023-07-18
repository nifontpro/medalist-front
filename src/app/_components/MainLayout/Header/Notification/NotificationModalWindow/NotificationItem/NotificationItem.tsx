import styles from './NotificationItem.module.scss';
import { NotificationItemProps } from './NotificationItem.props';
import cn from 'classnames';
import ImageDefault  from '@/ui/ImageDefault/ImageDefault';
import { timeConverter } from '@/utils/timeConverter';
import P from '@/ui/P/P';
import { useMessageAdmin } from '@/api/msg/useMessageAdmin';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';

const NotificationItem = ({
  className,
  notification,
  ...props
}: NotificationItemProps): JSX.Element => {
  const { deleteEventAsync, deleteEventInfo } = useMessageAdmin();

  return (
    <>
      <li
        {...props}
        className={cn(styles.item, className)}
        onClick={() => deleteEventAsync(notification.id)}
      >
        <div className={styles.img}>
          <ImageDefault
            src={notification.imageUrl}
            width={64}
            height={64}
            alt='award img'
            className='rounded-[5px]'
          />
        </div>
        <div>
          <P size='xs' className={styles.link}>
            {notification.msg}
          </P>
          <P size='xs' fontstyle='thin' color='gray' className={styles.link}>
            {timeConverter(notification.sendDate)}
          </P>
        </div>
      </li>
      {deleteEventInfo.status == 'pending' ? <SpinnerFetching /> : null}
    </>
  );
};

export default NotificationItem;
