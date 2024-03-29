import styles from './ModalWindowWithAddUsers.module.scss';
import { ModalWindowWithAddUsersProps } from './ModalWindowWithAddUsers.props';
import cn from 'classnames';
import ExitIconSvg from '@/icons/close.svg';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
} from 'react';
import { useModalWindowWithAddUsers } from './useModalWindowWithAddUsers';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import ChoiceUsers from '@/ui/ChoiceUsers/ChoiceUsers';
import Button from '@/ui/Button/Button';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';

const ModalWindowWithAddUsers = forwardRef(
  (
    {
      textBtn,
      awardState,
      awardId,
      users,
      visibleModal,
      setVisibleModal,
      setSearchValue,
      addUsersSearchHandleChange,
      page,
      setPage,
      prevPage,
      nextPage,
      totalPage,
      className,
      ...props
    }: ModalWindowWithAddUsersProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      arrChoiceUser,
      setArrChoiceUser,
      onSubmitNominee,
      handleCancel,
      rewardInfo,
    } = useModalWindowWithAddUsers(
      setVisibleModal,
      awardId,
      awardState,
      setSearchValue
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

    const handleDrag = useCallback(
      (
        event: globalThis.MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
      ) => {
        if (info.offset.y > 100 && info.offset.y < 1000) {
          setVisibleModal(false);
        }
      },
      [setVisibleModal]
    );

    return (
      <>
        <AnimatePresence mode='wait'>
          {visibleModal && (
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
              <div className={styles.module} ref={ref}>
                <ExitIcon onClick={handleCancel} className={styles.exit} />
                <Htag tag='h2' className={styles.title}>
                  Добавить участника
                </Htag>
                <Htag className={styles.titleMedia} tag='h2'>
                  Выбрано сотрудников{' '}
                  <span className={styles.count}>{arrChoiceUser.length}</span>
                </Htag>
                <ChoiceUsers
                  setSearchValue={setSearchValue}
                  addUsersSearchHandleChange={addUsersSearchHandleChange}
                  users={users}
                  arrChoiceUser={arrChoiceUser}
                  setArrChoiceUser={setArrChoiceUser}
                  className={styles.mediaVisible}
                />
                {totalPage && totalPage > 1 ? (
                  <PrevNextPages
                    startPage={page + 1}
                    endPage={totalPage}
                    handleNextClick={nextPage}
                    handlePrevClick={prevPage}
                  />
                ) : null}
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
                    onClick={onSubmitNominee}
                    appearance='blackWhite'
                    size='l'
                    className={styles.confirm}
                  >
                    {textBtn}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {rewardInfo.status == 'pending' ? <SpinnerFetching /> : null}
      </>
    );
  }
);

ModalWindowWithAddUsers.displayName = 'ModalWindowWithAddUsers';

export default memo(ModalWindowWithAddUsers);

//Для мемоизации svg icon
const ExitIcon = memo(
  ({
    className,
    ...props
  }: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >): JSX.Element => {
    return <ExitIconSvg className={className} {...props} />;
  }
);
ExitIcon.displayName = 'ExitIcon';
//__________________
