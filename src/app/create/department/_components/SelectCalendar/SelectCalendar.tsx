import styles from './SelectCalendar.module.scss';
import cn from 'classnames';
import { SelectCalendarProps } from './SelectCalendar.props';
// import { DatePicker } from 'antd';
import P from '@/ui/P/P';
import dayjs from 'dayjs';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';

const SelectCalendar = ({
  handleChangeDate,
  error,
  title,
  className,
  ...props
}: SelectCalendarProps): JSX.Element => {
  const dateFormat = 'DD.MM.YYYY';

  return (
    <div {...props} className={cn(styles.calendar, className)}>
      <P className={styles.placeholder}>{title}</P>
      <MobileDatePicker
        format={dateFormat}
        // defaultValue={dayjs('2022-04-17')}
        className={cn(styles.calendar, {
          [styles.error]: error,
        })}
        onAccept={handleChangeDate}
      />
      {/* <DatePicker
        format={dateFormat}
        className={cn(styles.calendar, {
          [styles.error]: error,
        })}
        inputReadOnly={true}
        placeholder={'ДД.ММ.ГГГГ'}
        size='large'
        onChange={handleChangeDate}
        suffixIcon={false}
      /> */}
    </div>
  );
};

export default SelectCalendar;
