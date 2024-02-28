import { MoneyPreviewProps } from './MoneyPreview.props';
import P from '../P/P';
import cn from 'classnames';
import { formatNumberWithSpaces } from '@/utils/formatNumberWithSpace';
import styles from './MoneyPreview.module.scss';

const MoneyPreview = ({
  value,
  currency,
  color = 'white',
  className,
}: MoneyPreviewProps): JSX.Element => {
  return (
    <P size='m' color={color} className={cn('text-end', className)}>
      {value ? formatNumberWithSpaces(value) : 0}
      <span className={styles.currency}>&nbsp;{currency}</span>
    </P>
  );
};
export default MoneyPreview;
