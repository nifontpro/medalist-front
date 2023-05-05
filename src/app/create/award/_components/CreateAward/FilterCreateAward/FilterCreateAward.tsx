'use client'

import styles from './FilterCreateAward.module.scss';
import cn from 'classnames';
import { FilterCreateAwardProps } from './FilterCreateAward.props';
import { MouseEvent, useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from '@/ui/Button/Button';
import Htag from '@/ui/Htag/Htag';
import ChoiceUsers from '@/ui/ChoiceUsers/ChoiceUsers';

const FilterCreateAward = ({
  users,
  arrChoiceUser,
  setArrChoiceUser,
  className,
  ...props
}: FilterCreateAwardProps): JSX.Element => {
  const [visibleFilter, setVisibleFilter] = useState<boolean>(false);

  const variants = {
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
      setVisibleFilter(false);
    }
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setVisibleFilter(!visibleFilter);
  };

  //Закрытие модального окна уведомлений нажатием вне
  const refFilter = useRef(null);
  const refOpenFilter = useRef(null);
  const handleClickOutsideNotification = () => {
    setVisibleFilter(false);
  };
  useOutsideClick(
    refFilter,
    refOpenFilter,
    handleClickOutsideNotification,
    visibleFilter
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Button
        ref={refFilter}
        size='m'
        appearance='whiteBlack'
        className={styles.button}
        onClick={(e) => handleClick(e)}
      >
        Добавить
      </Button>

      <AnimatePresence mode='wait'>
        {visibleFilter && (
          <motion.div
            ref={refOpenFilter}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.filterWrapper)}
            drag='y'
            onDragEnd={(event, info) => handleDrag(event, info)}
            dragSnapToOrigin={true}
          >
            <div
              className={styles.slash}
              onClick={() => setVisibleFilter(false)}
            />
            <div className={styles.filterContent}>
              <Htag className={styles.title} tag='h2'>
                Сотрудники <span>{arrChoiceUser.length}</span>
              </Htag>
              <ChoiceUsers
                className={styles.mediaVisible}
                users={users}
                arrChoiceUser={arrChoiceUser}
                setArrChoiceUser={setArrChoiceUser}
              />
              <Button
                size='m'
                appearance='blackWhite'
                className={styles.button}
                onClick={(e) => handleClick(e)}
              >
                Подтвердить
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterCreateAward;
