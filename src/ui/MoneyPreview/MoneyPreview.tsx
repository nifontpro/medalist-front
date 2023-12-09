import { MoneyPreviewProps } from './MoneyPreview.props';
import P from '../P/P';
import cn from 'classnames';
import { formatNumberWithSpaces } from '@/utils/formatNumberWithSpace';

const MoneyPreview = ({
  value,
  currency,
  color = 'white',
  className,
}: MoneyPreviewProps): JSX.Element => {
  return (
    <P size='m' color={color} className={cn('text-end', className)}>
      {value ? formatNumberWithSpaces(value) : 0}&nbsp;{currency}
    </P>
  );
};
export default MoneyPreview;
