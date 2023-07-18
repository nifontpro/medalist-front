import styles from './NotificationModalWindow.module.scss';
import { NotificationModalWindowProps } from './NotificationModalWindow.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef, memo } from 'react';
import uniqid from 'uniqid';
import NotificationItem from './NotificationItem/NotificationItem';
import { AnimatePresence, motion } from 'framer-motion';
import ExitIcon from '@/icons/close.svg';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useMessageAdmin } from '@/api/msg/useMessageAdmin';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';

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
    const { deleteAllEventsAsync, deleteEventInfo } = useMessageAdmin();
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

            {message &&
            message.data &&
            message.data.filter((item) => item.read == false).length > 0 ? (
              <div className={styles.wrapperList}>
                <ul className={styles.list}>
                  {message.data.map((notification) => {
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
                  onClick={() => deleteAllEventsAsync(message.data)}
                >
                  Прочитать все уведомления
                </P>
              </div>
            ) : (
              <P size='m' fontstyle='thin' className={styles.noneNotification}>
                У вас пока нет уведомлений
              </P>
            )}
            {deleteEventInfo.status == 'pending' ? <SpinnerFetching /> : null}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

NotificationModalWindow.displayName = 'NotificationModalWindow';
export default memo(NotificationModalWindow)
