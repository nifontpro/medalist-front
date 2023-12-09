import styles from './SelectCalendarForm.module.scss';
import cn from 'classnames';
import { SelectCalendarFormProps } from './SelectCalendarForm.props';
import P from '@/ui/P/P';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { memo, useMemo } from 'react';
import CloseIcon from '@/icons/close.svg';
import dayjs from 'dayjs';

const SelectCalendarForm = ({
  value,
  handleChangeDate,
  handleClearDate,
  error,
  title,
  className,
  ...props
}: SelectCalendarFormProps): JSX.Element => {
  const dateFormat = useMemo(() => 'DD.MM.YYYY', []);

  return (
    <div {...props} className={cn(styles.calendar, className)}>
      <P className={styles.placeholder}>{title}</P>
      <MobileDatePicker
        value={
          value!.valueOf() < 0 ? null : (value as string | null | undefined)
        }
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

export default memo(SelectCalendarForm);
