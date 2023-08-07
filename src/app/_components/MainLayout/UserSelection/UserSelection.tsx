'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import uniqid from 'uniqid';
import { useUserSelection } from './useUserSelection';
import { getOwnerCreateUrl } from '@/config/api.config';
import ExitIcon from '@/icons/close.svg';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useEffect } from 'react';
import { setTypeOfUserUndefined } from '@/store/features/userSelection/userSelection.slice';
import {
  setArrayIds,
  setSelectedTreeId,
} from '@/store/features/sidebar/sidebarTree.slice';
import P from '@/ui/P/P';
import CreateOwnerIcon from '@/icons/ownerLogo.svg';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { User } from '@/types/user/user';

const UserSelection = ({ className, ...props }: UserSelectionProps) => {
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
    setIsOpen,
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
      dispatch(setIsOpen(false));
    }
  };

  useEffect(() => {
    if (rolesUser && rolesUser.data && rolesUser.data.length > 0) {
      if (
        typeOfUser &&
        rolesUser.data.filter((role) => role.id == typeOfUser.id).length > 0
      ) {
        dispatch(setArrayIds(expandedIds));
        dispatch(setSelectedTreeId(selectedIds));
      } else {
        dispatch(setTypeOfUserUndefined());
      }
    }
  });

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
                // ref={ref}
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
                  onClick={() => dispatch(setIsOpen(false))}
                />
                <ExitIcon
                  onClick={() => dispatch(setIsOpen(false))}
                  className={styles.exit}
                />
                <div className={styles.moduleContent}>
                  {/* <Htag tag='h2' className={styles.header}>
                    Выберите профиль
                  </Htag> */}
                  {rolesUser ? (
                    reversedRolesUser!.map((role) => {
                      return (
                        <div
                          key={uniqid()}
                          className={styles.role}
                          onClick={() => handleChangeRole(role)}
                        >
                          <ImageDefault
                            key={role.id}
                            src={role.mainImg ? role.mainImg : undefined}
                            width={40}
                            height={40}
                            alt='preview image'
                            className='rounded-[10px] mr-[15px]'
                          />
                          {role.firstname}
                        </div>
                      );
                    })
                  ) : (
                    <div className='text-center'>Нет аккаунтов</div>
                  )}
                  <div
                    className={styles.createWrapper}
                    onClick={() => push(getOwnerCreateUrl())}
                  >
                    <CreateOwnerIcon className={styles.owner} />
                    <P color='black' fontstyle='thin' className={styles.create}>
                      Зарегестрироваться как владелец
                    </P>
                  </div>
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
