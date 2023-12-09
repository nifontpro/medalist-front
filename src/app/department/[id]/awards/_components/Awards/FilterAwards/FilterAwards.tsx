import styles from './FilterAwards.module.scss';
import cn from 'classnames';
import { FilterAwardsProps } from './FilterAwards.props';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import CheckedIcon from '@/icons/checked.svg';
import SortIcon from '@/icons/sort.svg';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from '@/ui/Button/Button';
import P from '@/ui/P/P';

const FilterAwards = ({
  state,
  setState,
  active,
  setActive,
  // allNominee,
  // allAwards,
  awardsFull,
  className,
  ...props
}: FilterAwardsProps): JSX.Element => {
  const [visibleFilter, setVisibleFilter] = useState<boolean>(false);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 460,
    },
    exit: {
      opacity: 0,
      y: 460,
    },
  };
  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 && info.offset.y < 1000) {
      setVisibleFilter(false);
    }
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
        onClick={() => setVisibleFilter(!visibleFilter)}
      >
        <SortIcon /> &emsp;Фильтры
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
              {/* Сортировка по виду */}
              <div className={styles.departs}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Показать
                </P>
                <ul className={styles.list}>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive(undefined)}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == undefined,
                        [styles.hidden]: active != undefined,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != undefined,
                      })}
                    >
                      Все награды
                      {/* <span className={styles.count}>{awardsFull?.length}</span> */}
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('FINISH')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'FINISH',
                        [styles.hidden]: active != 'FINISH',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'FINISH',
                      })}
                    >
                      Завершенные
                      {/* <span className={styles.count}>{allAwards?.length}</span> */}
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('NOMINEE')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'NOMINEE',
                        [styles.hidden]: active != 'NOMINEE',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'NOMINEE',
                      })}
                    >
                      Номинации
                      {/* <span className={styles.count}>{allNominee?.length}</span> */}
                    </P>
                  </li>
                </ul>
              </div>

              {/* Сортировка по дате */}
              <div className={styles.sortDate}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Сортировать
                </P>
                <ul className={styles.list}>
                  <li
                    className={styles.listItem}
                    onClick={() => setState('ASC')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == 'ASC',
                        [styles.hidden]: state == 'DESC',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == 'DESC',
                      })}
                    >
                      Cначала новые
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setState('DESC')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == 'DESC',
                        [styles.hidden]: state == 'ASC',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == 'ASC',
                      })}
                    >
                      Cначала старые
                    </P>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterAwards;
