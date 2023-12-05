import styles from './SelectCalendarRange.module.scss';
import cn from 'classnames';
import { SelectCalendarRangeProps } from './SelectCalendarRange.props';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import CalenradIcon from './calendar.svg';
import P from '../P/P';
import { memo } from 'react';

const SelectCalendarRange = ({
  startDate,
  endDate,
  setStartDateChange,
  setEndDateChange,
  className,
  ...props
}: SelectCalendarRangeProps): JSX.Element => {
  const dateFormat = 'DD.MM.YYYY';

  const onChangeStart = (value: string | null) => {
    if (!endDate) {
      setStartDateChange(dayjs(value).unix() * 1000);
    } else {
      if (endDate === dayjs(value).unix() * 1000) {
        setStartDateChange(dayjs(value).unix() * 1000);
        setEndDateChange(dayjs(value).unix() * 1000 + 86400000);
      } else {
        setStartDateChange(dayjs(value).unix() * 1000);
      }
    }
  };

  const onChangeEnd = (value: string | null) => {
    if (!startDate) {
      setEndDateChange(dayjs(value).unix() * 1000);
    } else {
      if (startDate === dayjs(value).unix() * 1000) {
        setStartDateChange(dayjs(value).unix() * 1000);
        setEndDateChange(dayjs(value).unix() * 1000 + 86400000);
      } else {
        setEndDateChange(dayjs(value).unix() * 1000);
      }
    }
    // setEndDateChange(dayjs(value).unix() * 1000);
  };

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <CalenradIcon className={styles.icon} />

      <MobileDatePicker
        label='Начало'
        format={dateFormat}
        className={styles.calendarInput}
        onAccept={onChangeStart}
      />
      <P size='m'>-</P>
      <MobileDatePicker
        label='Конец'
        format={dateFormat}
        className={styles.calendarInput}
        onAccept={onChangeEnd}
      />
    </div>
  );
};

export default memo(SelectCalendarRange);
