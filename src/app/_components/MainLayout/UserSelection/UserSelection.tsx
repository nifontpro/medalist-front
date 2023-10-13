'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import { useUserSelection } from './useUserSelection';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useCallback, useEffect, useRef } from 'react';
import {
  setTypeOfUser_IsOpen,
  setTypeOfUserUndefined,
} from '@/store/features/userSelection/userSelection.slice';
import { setArrayIds } from '@/store/features/sidebar/sidebarTree.slice';
import { User } from '@/types/user/user';
import { useUserPanelModalWindow } from '../Header/UserLogo/UserPanelModalWindow/useUserPanelModalWindow';
import useOutsideClickWithoutBtn from '@/hooks/useOutsideClickWithoutBtn';
import WindowWithoutRoles from './WindowWithoutRoles/WindowWithoutRoles';
import WindowWithRoles from './WindowWithRoles/WindowWithRoles';

const UserSelection = ({ className, ...props }: UserSelectionProps) => {
  const { handleLogoutClick } = useUserPanelModalWindow();

  const {
    isAuth,
    typeOfUser,
    isOpen,
    pathName,
    rolesUser,
    handleChangeRole,
    isLoading,
    push,
    dispatch,
    setIsOpenUserSelection,
    expandedIds,
    selectedIds,
  } = useUserSelection();

  let reversedRolesUser: User[] = [];
  if (rolesUser && rolesUser.data) {
    // @ts-ignore: Unreachable code error
    reversedRolesUser = rolesUser.data.toReversed();
  }

  const { windowSize } = useWindowSize();

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: windowSize.winWidth > 768 ? '0px' : '460px',
    },
    exit: {
      opacity: 0,
      y: windowSize.winWidth > 768 ? '0px' : '460px',
    },
  };
  const handleDrag = (
    event: globalThis.MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 && info.offset.y < 1000) {
      dispatch(setIsOpenUserSelection(false));
    }
  };

  useEffect(() => {
    if (rolesUser?.data?.length && rolesUser?.data?.length > 0) {
      if (
        typeOfUser &&
        rolesUser?.data.filter((role) => role.id == typeOfUser.id).length > 0
      ) {
        dispatch(setArrayIds(expandedIds));
        // dispatch(setSelectedTreeId(selectedIds));
      } else {
        dispatch(setTypeOfUserUndefined());
      }
      if (rolesUser?.data?.length == 1) {
        dispatch(setTypeOfUser_IsOpen(rolesUser?.data[0]));
      }
    } else if (rolesUser?.data?.length == 0) {
      dispatch(setTypeOfUserUndefined());
    }
  });

  //Закрытие модального окна уведомлений нажатием вне
  const ref = useRef(null);
  const handleClickOutsideNotification = useCallback(() => {
    dispatch(setIsOpenUserSelection(false));
  }, []);
  useOutsideClickWithoutBtn(ref, handleClickOutsideNotification, isOpen);

  return (
    <>
      {(isAuth && typeOfUser != undefined && !isOpen) ||
      pathName == '/login' ||
      pathName == '/create/owner' ? null : (
        <div className={cn(styles.wrapper, className)} {...props}>
          {!isLoading && (
            <AnimatePresence mode='wait'>
              <motion.div
                className={styles.window}
                ref={ref}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={variants}
                transition={{ duration: 0.4 }}
                drag={windowSize.winWidth < 768 ? 'y' : undefined}
                onDragEnd={(event, info) => handleDrag(event, info)}
                dragSnapToOrigin={true}
              >
                <div
                  className={styles.slash}
                  onClick={() => dispatch(setIsOpenUserSelection(false))}
                />
                <div className={styles.moduleContent}>
                  {/* Если есть роли */}
                  {rolesUser?.data?.length && rolesUser?.data?.length > 0 ? (
                    <WindowWithRoles
                      handleLogoutClick={handleLogoutClick}
                      rolesUser={rolesUser?.data}
                      handleChangeRole={handleChangeRole}
                    />
                  ) : null}
                  {/* Если нет ролей */}
                  {rolesUser?.data?.length == 0 ? (
                    <WindowWithoutRoles handleLogoutClick={handleLogoutClick} />
                  ) : null}{' '}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </>
  );
};

export default UserSelection;
