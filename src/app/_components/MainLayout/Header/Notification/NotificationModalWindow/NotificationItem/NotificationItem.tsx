import styles from './NotificationItem.module.scss';
import { NotificationItemProps } from './NotificationItem.props';
import cn from 'classnames';
import { useUserPanelModalWindow } from '../useNotificationModalWindow';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import { timeConverter } from '@/utils/timeConverter';
import P from '@/ui/P/P';

const NotificationItem = ({
  className,
  notification,
  ...props
}: NotificationItemProps): JSX.Element => {

  const {
    handleClickRead,
  } = useUserPanelModalWindow(undefined, notification.id);

  return (
    <li {...props} className={cn(styles.item, className)} onClick={handleClickRead}>
      <div className={styles.img}>
        <ImageDefault
          src={notification.imageUrl}
          width={64}
          height={64}
          alt='award img'
          objectFit='cover'
          className='rounded-[5px]'
          // priority={true}
        />
      </div>
      <div>
        <P size='xs' className={styles.link}>
          {notification.text}
        </P>
        <P size='xs' fontstyle='thin' color='gray' className={styles.link}>
          {timeConverter(notification.sendDate)}
        </P>
      </div>
    </li>
  );
};

export default NotificationItem;
