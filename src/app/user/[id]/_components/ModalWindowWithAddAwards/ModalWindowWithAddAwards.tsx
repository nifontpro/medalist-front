import styles from './ModalWindowWithAddAwards.module.scss';
import { ModalWindowWithAddAwardsProps } from './ModalWindowWithAddAwards.props';
import cn from 'classnames';
import ExitIcon from '@/icons/close.svg';
import { ForwardedRef, forwardRef } from 'react';
import { useModalWindowWithAddAwards } from './useModalWindowWithAddAwards';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/hooks/useWindowSize';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import ChoiceAwards from '../ChoiceAwards/ChoiceAwards';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';

const ModalWindowWithAddAwards = forwardRef(
  (
    {
      textBtn,
      awardState,
      userId,
      awards,
      visibleModal,
      setVisibleModal,
      setSearchValue,
      page,
      setPage,
      prevPage,
      nextPage,
      totalPage,
      className,
      ...props
    }: ModalWindowWithAddAwardsProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { arrChoiceAward, setArrChoiceAward, handleCancel, onSubmitNominee } =
      useModalWindowWithAddAwards(
        setVisibleModal,
        userId,
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
                Добавить награду
              </Htag>
              <ChoiceAwards
                setSearchValue={setSearchValue}
                awards={awards}
                arrChoiceAward={arrChoiceAward}
                setArrChoiceAward={setArrChoiceAward}
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
    );
  }
);

ModalWindowWithAddAwards.displayName = 'ModalWindowWithAddAwards';
export default ModalWindowWithAddAwards;
