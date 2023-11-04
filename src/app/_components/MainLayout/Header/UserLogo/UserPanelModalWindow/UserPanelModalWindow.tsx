import styles from './UserPanelModalWindow.module.scss';
import { UserPanelModalWindowProps } from './UserPanelModalWindow.props';
import cn from 'classnames';
import ProfileIcon from '@/icons/profile.svg';
import ChangeRoleIcon from '@/icons/changeRole.svg';
import EditIcon from '@/icons/editProfile.svg';
import ExitIcon from '@/icons/exit.svg';
import { ForwardedRef, forwardRef, memo } from 'react';
import { useUserPanelModalWindow } from './useUserPanelModalWindow';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ThemeSwitcher from '@/ui/ThemeSwitcher/ThemeSwitcher';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';

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
    const {
      handleClickProfile,
      handleClickEditProfile,
      handleLogoutClick,
      handleChangeCompany,
    } = useUserPanelModalWindow(setVisibleModal, user);

    const { data: rolesUser, isLoading } =
      userApi.useGetProfilesQuery(undefined);

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
            <div className={styles.title}>
              <P fontstyle='thin' size='xl' className={styles.titleItem}>
                {user.firstname} {user.lastname}
              </P>
              <P fontstyle='thin' size='l' className={styles.titleItem}>
                {user.dept?.name} / {user.post}
              </P>
              <P size='xs'>{user.authEmail}</P>
            </div>

            <ul className={styles.list}>
              {/* <li className={styles.itemAbsolute}>
                <ThemeSwitcher />
              </li> */}
              <li className={styles.item} onClick={handleClickProfile}>
                <ProfileIcon />
                <P size='xs' fontstyle='thin' className={styles.link}>
                  Мой профиль
                </P>
              </li>
              {rolesUser?.data?.length && rolesUser?.data?.length > 1 ? (
                <li className={styles.item} onClick={handleChangeCompany}>
                  <ChangeRoleIcon />
                  <P size='xs' fontstyle='thin' className={styles.link}>
                    Выбрать организацию
                  </P>
                </li>
              ) : null}
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
