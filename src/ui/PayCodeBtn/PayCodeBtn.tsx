import styles from './PayCodeBtn.module.scss';
import cn from 'classnames';
import { PayCodeBtnProps } from './PayCodeBtn.props';
import { memo, useMemo } from 'react';
import P from '../P/P';
import ImageDefault from '../ImageDefault/ImageDefault';
import { timeConverter } from '@/utils/timeConverter';

let PayCodeStatus = {
  PAY: 'Ожидает выдачи с',
  GIVEN: 'Получен',
  RETURN: 'Возвращен',
  UNDEF: '',
};

const PayCodeBtn = ({
  gift,
  className,
  ...props
}: PayCodeBtnProps): JSX.Element => {
  let convertDate = useMemo(() => timeConverter(gift.dateOp), [gift]);

  return (
    // <div className={cn(styles.wrapper, className)} {...props}>
    //   {PayCodeStatus[gift.payCode]} {convertDate}
    // </div>
    <P
      size='xs'
      fontstyle='thin'
      type={gift.payCode === 'PAY' ? 'limeBtn' : 'grayBtn'}
      className={cn(styles.wrapper, className)}
    >
      {PayCodeStatus[gift.payCode]} {convertDate}
    </P>
  );
};
export default memo(PayCodeBtn);
