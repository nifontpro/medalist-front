import styles from './NotificationModalWindow.module.scss';
import { NotificationModalWindowProps } from './NotificationModalWindow.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { useUserPanelModalWindow } from './useNotificationModalWindow';
import uniqid from 'uniqid';
import NotificationItem from './NotificationItem/NotificationItem';
import { AnimatePresence, motion } from 'framer-motion';
import ExitIcon from '@/icons/close.svg';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { useWindowSize } from '@/hooks/useWindowSize';

const NotificationModalWindow = forwardRef(
  (
    {
      visibleModal,
      setVisibleModal,
      message,
      className,
      ...props
    }: NotificationModalWindowProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { handleClickReadAll } = useUserPanelModalWindow(message);
    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: windowSize.winWidth < 768 ? '0' : '-60px',
      },
      exit: {
        opacity: 0,
        y: windowSize.winWidth < 768 ? '0' : '-60px',
      },
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.userModalWindow, className)}
            {...props}
            ref={ref}
          >
            <ExitIcon
              className={styles.exit}
              onClick={() => setVisibleModal(false)}
            />
            <Htag tag='h3' className={styles.title}>
              Уведомления
            </Htag>

            {message != undefined &&
            message.filter((item) => item.read == false).length > 0 ? (
              <div className={styles.wrapperList}>
                <ul className={styles.list}>
                  {message.map((notification) => {
                    if (notification.read == false) {
                      return (
                        <NotificationItem
                          key={uniqid()}
                          notification={notification}
                        />
                      );
                    }
                  })}
                </ul>
                <P
                  size='xs'
                  className={styles.check}
                  onClick={handleClickReadAll}
                >
                  Отметить все прочитанным
                </P>
              </div>
            ) : (
              <P size='m' fontstyle='thin' className={styles.noneNotification}>
                У вас пока нет уведомлений
              </P>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

NotificationModalWindow.displayName = 'NotificationModalWindow';
export default NotificationModalWindow;
