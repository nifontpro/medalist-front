import styles from './Notification.module.scss';
import { NotificationProps } from './Notification.props';
import { useRef, useState } from 'react';
import NotificationModalWindow from './NotificationModalWindow/NotificationModalWindow';
import NotificationIcon from '@/icons/notification.svg';
import useOutsideClick from '@/hooks/useOutsideClick';
import P from '@/ui/P/P';

const Notification = ({
  allMessage,
  className,
  ...props
}: NotificationProps): JSX.Element => {
  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);

  //Закрытие модального окна уведомлений нажатием вне
  const refNotification = useRef(null);
  const refOpenNotification = useRef(null);
  const handleClickOutsideNotification = () => {
    setVisibleNotification(false);
  };
  useOutsideClick(
    refNotification,
    refOpenNotification,
    handleClickOutsideNotification,
    visibleNotification
  );

  return (
    <>
      <div
        className={styles.userComponent}
        ref={refOpenNotification}
        onClick={() => setVisibleNotification(!visibleNotification)}
        {...props}
      >
        <NotificationIcon className={styles.notification} />
        {allMessage &&
          allMessage.filter((item) => item.read == false).length > 0 && (
            <>
              <div className={styles.notificationCircle}></div>
              <P
                size='xs'
                fontstyle='thin'
                className={styles.notificationCount}
              >
                {allMessage?.filter((item) => item.read == false).length}
              </P>
            </>
          )}
      </div>
      <NotificationModalWindow
        visibleModal={visibleNotification}
        setVisibleModal={setVisibleNotification}
        message={allMessage}
        ref={refNotification}
      />
    </>
  );
};

export default Notification;