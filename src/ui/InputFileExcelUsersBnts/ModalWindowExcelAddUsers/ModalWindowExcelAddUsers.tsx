import styles from './ModalWindowExcelAddUsers.module.scss';
import { ModalWindowExcelAddUsersProps } from './ModalWindowExcelAddUsers.props';
import cn from 'classnames';
import ExitIcon from '@/icons/close.svg';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { useModalWindowExcelAddUsers } from './useModalWindowExcelAddUsers';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import uniqid from 'uniqid';
import { useWindowSize } from '@/hooks/useWindowSize';
import P from '@/ui/P/P';
import Button from '@/ui/Button/Button';
import useOutsideClickWithoutBtn from '@/hooks/useOutsideClickWithoutBtn';
import { Divider } from '@mui/material';

const ModalWindowExcelAddUsers = forwardRef(
  (
    {
      textBtn,
      data,
      setData,
      visibleModal,
      fileName,
      setVisibleModal,
      department,
      handleClearInput,
      className,
      ...props
    }: ModalWindowExcelAddUsersProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { handleCancel, onSubmitAdded } = useModalWindowExcelAddUsers(
      setVisibleModal,
      setData,
      handleClearInput,
      data,
      department
    );

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
      },
    };

    const variantsMedia = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: '460px',
      },
      exit: {
        opacity: 0,
        y: '460px',
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

    //Закрытие модального окна уведомлений нажатием вне
    const refModal = useRef(null);
    useOutsideClickWithoutBtn(refModal, handleCancel, visibleModal);

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && data ? (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={windowSize.winWidth <= 768 ? variantsMedia : variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.modalWindow, className)}
            drag={windowSize.winWidth < 768 ? 'y' : undefined}
            onDragEnd={(event, info) => handleDrag(event, info)}
            dragSnapToOrigin={true}
            {...props}
          >
            <div className={styles.slash} onClick={handleCancel} />

            <div className={styles.module} ref={refModal}>
              <ExitIcon onClick={handleCancel} className={styles.exit} />
              <div>
                <P size='s' className={styles.fileName}>
                  {fileName}
                </P>
                {/* <div className={styles.header}>
                  <P size='s'>{department.dept.name}</P>
                </div> */}

                {data ? (
                  <ul>
                    {data?.map((user) => {
                      return (
                        <li key={uniqid()} className={styles.item}>
                          №&nbsp;{user['№']}
                          <P size='s'>
                            {user.Фамилия} {user.Имя} {user.Отчество}
                          </P>
                          <div className={styles.itemProps}>
                            <P size='xs'>Email:&nbsp;</P>
                            {user.email}
                          </div>
                          <div className={styles.itemProps}>
                            <P size='xs'>Телефон:&nbsp;</P>
                            {user.Телефон}
                          </div>
                          <div className={styles.itemProps}>
                            <P size='xs'>Должность:&nbsp;</P>
                            {user.Должность}
                          </div>
                          <div className={styles.itemProps}>
                            <P size='xs'>О&nbsp;сотруднике:&nbsp;</P>
                            {user['О сотруднике']}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <P size='s'>Файл не распознан</P>
                )}
              </div>

              <div className={styles.buttons}>
                <Button
                  onClick={handleCancel}
                  appearance='whiteBlack'
                  size='l'
                  className={styles.cancel}
                >
                  Отменить
                </Button>
                <Button
                  onClick={onSubmitAdded}
                  appearance='blackWhite'
                  size='l'
                  className={styles.confirm}
                  disabled={!data}
                >
                  {textBtn}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }
);

ModalWindowExcelAddUsers.displayName = 'ModalWindowExcelAddUsers';
export default ModalWindowExcelAddUsers;
