import styles from './SelectCalendar.module.scss';
import cn from 'classnames';
import { SelectCalendarProps } from './SelectCalendar.props';
import P from '@/ui/P/P';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { memo, useMemo } from 'react';

const SelectCalendar = ({
  handleChangeDate,
  error,
  title,
  className,
  ...props
}: SelectCalendarProps): JSX.Element => {
  const dateFormat = useMemo(() => 'DD.MM.YYYY', []);

  return (
    <div {...props} className={cn(styles.calendar, className)}>
      <P className={styles.placeholder}>{title}</P>
      <MobileDatePicker
        format={dateFormat}
        className={cn(styles.calendar, {
          [styles.error]: error,
        })}
        onAccept={handleChangeDate}
      />
    </div>
  );
};

export default memo(SelectCalendar);
