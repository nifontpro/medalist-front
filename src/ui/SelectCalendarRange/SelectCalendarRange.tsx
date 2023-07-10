import styles from './SelectCalendarRange.module.scss';
import cn from 'classnames';
import { SelectCalendarRangeProps } from './SelectCalendarRange.props';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import CalenradIcon from './calendar.svg';
import P from '../P/P';

const SelectCalendarRange = ({
  setStartDateChange,
  setEndDateChange,
  className,
  ...props
}: SelectCalendarRangeProps): JSX.Element => {
  const dateFormat = 'DD.MM.YYYY';

  const onChangeStart = (value: string | null) => {
    setStartDateChange(dayjs(value).unix() * 1000);
  };

  const onChangeEnd = (value: string | null) => {
    setEndDateChange(dayjs(value).unix() * 1000);
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

export default SelectCalendarRange;
