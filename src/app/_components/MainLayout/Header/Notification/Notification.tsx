import styles from './Notification.module.scss';
import { NotificationProps } from './Notification.props';
import { memo, useCallback, useRef, useState } from 'react';
import NotificationModalWindow from './NotificationModalWindow/NotificationModalWindow';
import NotificationIconSvg from '@/icons/notification.svg';
import useOutsideClick from '@/hooks/useOutsideClick';
import P from '@/ui/P/P';
import { messageApi } from '@/api/msg/message.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const Notification = ({
  className,
  ...props
}: NotificationProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  /**
   *Получить свои сообщения
   */
  const { data: myMessage, isLoading: isLoadingMyMessage } =
    messageApi.useGetMessagesQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      },
      {
        skip: !typeOfUser,
      }
    );

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
        myMessage.data.filter((message) => message.read == false).length > 0 ? (
          <div className={styles.notificationCircle}>
            <P size='xs' fontstyle='thin' className={styles.notificationCount}>
              {
                myMessage.data?.filter((message) => message.read == false)
                  .length
              }
            </P>
          </div>
        ) : null}
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
