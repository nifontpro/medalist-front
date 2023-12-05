import styles from './FilterHistory.module.scss';
import cn from 'classnames';
import uniqid from 'uniqid';
import { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import CheckedIcon from '@/icons/checked.svg';
import SortIcon from '@/icons/sort.svg';
import { FilterHistoryProps } from './FilterHistory.props';
import Button from '@/ui/Button/Button';
import P from '@/ui/P/P';
import SelectCalendarRange from '@/ui/SelectCalendarRange/SelectCalendarRange';

const FilterHistory = ({
  state,
  setState,
  paycode,
  setPaycode,
  setStartDateChange,
  setEndDateChange,
  className,
  startDate,
  endDate,
  ...props
}: FilterHistoryProps): JSX.Element => {
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
                  <li
                    className={styles.listItem}
                    onClick={() => setPaycode('UNDEF')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: paycode == 'UNDEF',
                        [styles.hidden]: paycode != 'UNDEF',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: paycode != 'UNDEF',
                      })}
                    >
                      Всe
                      {/* <span className={styles.count}>{allActivityLength}</span> */}
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setPaycode('PAY')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: paycode == 'PAY',
                        [styles.hidden]: paycode != 'PAY',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: paycode != 'PAY',
                      })}
                    >
                      Еще не выданы
                      {/* <span className={styles.count}>{awardsLength}</span> */}
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setPaycode('GIVEN')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: paycode == 'GIVEN',
                        [styles.hidden]: paycode != 'GIVEN',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: paycode != 'GIVEN',
                      })}
                    >
                      Получены
                      {/* <span className={styles.count}>{nomineeLength}</span> */}
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setPaycode('RETURN')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: paycode == 'RETURN',
                        [styles.hidden]: paycode != 'RETURN',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: paycode != 'RETURN',
                      })}
                    >
                      Возвращены
                      {/* <span className={styles.count}>{otherLength}</span> */}
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
                      Cначала новые
                    </P>
                  </li>
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
                <SelectCalendarRange
                  setStartDateChange={setStartDateChange}
                  setEndDateChange={setEndDateChange}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterHistory;
