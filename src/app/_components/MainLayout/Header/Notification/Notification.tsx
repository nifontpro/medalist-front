import styles from './Notification.module.scss';
import { NotificationProps } from './Notification.props';
import { memo, useCallback, useRef, useState } from 'react';
import NotificationModalWindow from './NotificationModalWindow/NotificationModalWindow';
import NotificationIconSvg from '@/icons/notification.svg';
import useOutsideClick from '@/hooks/useOutsideClick';
import P from '@/ui/P/P';
import { useMessageAdmin } from '@/api/msg/useMessageAdmin';

const Notification = ({
  className,
  ...props
}: NotificationProps): JSX.Element => {
  const { myMessage, isLoadingMyMessage } = useMessageAdmin();

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);

  //Закрытие модального окна уведомлений нажатием вне
  const refNotification = useRef(null);
  const refOpenNotification = useRef(null);
  const handleClickOutsideNotification = useCallback(() => {
    setVisibleNotification(false);
  }, []);
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
        <NotificationIcon />
        {myMessage &&
          myMessage.data &&
          myMessage.data.filter((message) => message.read == false).length >
            0 && (
            <>
              <div className={styles.notificationCircle}></div>
              <P
                size='xs'
                fontstyle='thin'
                className={styles.notificationCount}
              >
                {
                  myMessage.data?.filter((message) => message.read == false)
                    .length
                }
              </P>
            </>
          )}
      </div>
      <NotificationModalWindow
        visibleModal={visibleNotification}
        setVisibleModal={setVisibleNotification}
        message={myMessage}
        ref={refNotification}
      />
    </>
  );
};

export default memo(Notification);

//Для мемоизации svg icon
const NotificationIcon = memo(() => {
  return <NotificationIconSvg className={styles.notification} />;
});
NotificationIcon.displayName = 'NotificationIcon';
//__________________
