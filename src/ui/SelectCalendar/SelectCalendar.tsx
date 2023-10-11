import styles from './SelectCalendar.module.scss';
import cn from 'classnames';
import { SelectCalendarProps } from './SelectCalendar.props';
import P from '@/ui/P/P';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { memo, useMemo } from 'react';
import CloseIcon from '@/icons/close.svg';

const SelectCalendar = ({
  value,
  handleChangeDate,
  handleClearDate,
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
        value={value}
        defaultValue={null}
        format={dateFormat}
        className={cn(styles.calendar, {
          [styles.error]: error,
        })}
        onAccept={handleChangeDate}
      />

      <CloseIcon className={styles.closeIcon} onClick={handleClearDate} />
    </div>
  );
};

export default memo(SelectCalendar);
