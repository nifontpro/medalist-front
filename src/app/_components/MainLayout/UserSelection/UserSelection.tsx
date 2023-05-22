'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import { useUserSelection } from './useUserSelection';
import { getOwnerCreateUrl } from '@/config/api.config';
import ExitIcon from '@/icons/close.svg';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';

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
  } = useUserSelection();

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
                  <Htag tag='h2' className={styles.header}>
                    Выберите профиль
                  </Htag>
                  {rolesUser ? (
                    rolesUser.data!.map((role) => {
                      return (
                        <div
                          key={uniqid()}
                          className={styles.role}
                          onClick={() => handleChangeRole(role)}
                        >
                          id: {role.id} <br />
                          {role.dept.name}
                        </div>
                      );
                    })
                  ) : (
                    <div className='text-center'>Нет аккаунтов</div>
                  )}
                  <Htag
                    tag='h3'
                    className={styles.create}
                    onClick={() => push(getOwnerCreateUrl())}
                  >
                    Зарегестрироваться как владелец
                  </Htag>
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
