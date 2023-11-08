import { MoneyPreviewProps } from './MoneyPreview.props';
import P from '../P/P';
import cn from 'classnames';

const MoneyPreview = ({
  value,
  currency,
  color = 'white',
  className,
}: MoneyPreviewProps): JSX.Element => {
  return (
    <P size='m' color={color} className={cn('text-end', className)}>
      {value ? value : 0}&nbsp;{currency}
    </P>
  );
};
export default MoneyPreview;
