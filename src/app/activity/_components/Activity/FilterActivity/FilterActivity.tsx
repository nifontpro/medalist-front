import styles from './FilterActivity.module.scss';
import cn from 'classnames';
import uniqid from 'uniqid';
import { FilterActivityProps } from './FilterActivity.props';
import Button from '@/core/presenter/ui/Button/Button';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import P from '@/core/presenter/ui/P/P';
import CheckedIcon from '@/core/presenter/images/checked.svg';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import SortIcon from '@/core/presenter/images/sort.svg';
import RangeCalendar from '@/core/presenter/ui/RangeCalendar/RangeCalendar';

const FilterActivity = ({
  state,
  setState,
  active,
  setActive,
  setEndDate,
  setStartDate,
  allActivityLength,
  awardsLength,
  nomineeLength,
  otherLength,
  startDate,
  endDate,
  setSizePage,
  setArr,
  className,
  ...props
}: FilterActivityProps): JSX.Element => {
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

  // //Закрытие модального окна уведомлений нажатием вне
  // const refFilter = useRef(null);
  // const refOpenFilter = useRef(null);
  // const handleClickOutsideNotification = () => {
  //   setVisibleFilter(false);
  // };
  // useOutsideClick(
  //   refFilter,
  //   refOpenFilter,
  //   handleClickOutsideNotification,
  //   visibleFilter
  // );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Button
        // ref={refFilter}
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
            // ref={refOpenFilter}
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
                  <li className={styles.listItem} onClick={() => setActive('')}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == '',
                        [styles.hidden]: active != '',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != '',
                      })}
                    >
                      Вся активность
                      <span className={styles.count}>{allActivityLength}</span>
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('AWARD')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'AWARD',
                        [styles.hidden]: active != 'AWARD',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'AWARD',
                      })}
                    >
                      Медали
                      <span className={styles.count}>{awardsLength}</span>
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
                      <span className={styles.count}>{nomineeLength}</span>
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('DELETE_USER')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'DELETE_USER',
                        [styles.hidden]: active != 'DELETE_USER',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'DELETE_USER',
                      })}
                    >
                      Прочее
                      <span className={styles.count}>{otherLength}</span>
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
                  <li className={styles.listItem} onClick={() => setState(1)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == 1,
                        [styles.hidden]: state == -1,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == -1,
                      })}
                    >
                      Cначала новые
                    </P>
                  </li>
                  <li className={styles.listItem} onClick={() => setState(-1)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == -1,
                        [styles.hidden]: state == 1,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == 1,
                      })}
                    >
                      Cначала старые
                    </P>
                  </li>
                </ul>
              </div>

              {/* Сортировка по периоду */}
              <div className={styles.sortAwards}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Период
                </P>
                <RangeCalendar
                  placement='topLeft'
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  startDate={startDate}
                  endDate={endDate}
                  setSizePage={setSizePage}
                  setArr={setArr}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterActivity;
