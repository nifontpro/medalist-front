import styles from './UserPanelModalWindow.module.scss';
import { UserPanelModalWindowProps } from './UserPanelModalWindow.props';
import cn from 'classnames';
import ProfileIcon from '@/icons/profile.svg';
import EditIcon from '@/icons/editProfile.svg';
import ExitIcon from '@/icons/exit.svg';
import { ForwardedRef, forwardRef, memo } from 'react';
import { useUserPanelModalWindow } from './useUserPanelModalWindow';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ThemeSwitcher from '@/ui/ThemeSwitcher/ThemeSwitcher';

const UserPanelModalWindow = forwardRef(
  (
    {
      visibleModal,
      setVisibleModal,
      user,
      className,
      ...props
    }: UserPanelModalWindowProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { handleClickProfile, handleClickEditProfile, handleLogoutClick } =
      useUserPanelModalWindow(setVisibleModal, user);

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: windowSize.winWidth > 768 ? '-60px' : '460px',
      },
      exit: {
        opacity: 0,
        y: windowSize.winWidth > 768 ? '-60px' : '460px',
      },
    };

    const handleDrag = (
      event: globalThis.MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (info.offset.y > 100 && info.offset.y < 1000) {
        setVisibleModal(false);
      }
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            ref={ref}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.userModalWindow, className)}
            drag={windowSize.winWidth < 768 ? 'y' : undefined}
            onDragEnd={(event, info) => handleDrag(event, info)}
            dragSnapToOrigin={true}
            {...props}
          >
            <div
              className={styles.slash}
              onClick={() => setVisibleModal(false)}
            />

            <Htag tag='h3' className={styles.title}>
              {user.authEmail}
            </Htag>
            <ul className={styles.list}>
              <li className={styles.itemAbsolute}>
                <ThemeSwitcher />
              </li>
              <li className={styles.item} onClick={handleClickProfile}>
                <ProfileIcon />
                <P size='xs' fontstyle='thin' className={styles.link}>
                  Мой профиль
                </P>
              </li>
              <li className={styles.item} onClick={handleClickEditProfile}>
                <EditIcon />
                <P size='xs' fontstyle='thin' className={styles.link}>
                  Редактировать
                </P>
              </li>
              <li className={styles.item} onClick={handleLogoutClick}>
                <ExitIcon />
                <P size='xs' fontstyle='thin' className={styles.link}>
                  Выйти
                </P>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

UserPanelModalWindow.displayName = 'UserPanelModalWindow';
export default memo(UserPanelModalWindow);
