import P from '@/ui/P/P';
import styles from './Money.module.scss';
import { MoneyProps } from './Money.props';
import CupIcon from '@/icons/cup.svg';
import MoneyPreview from '@/ui/MoneyPreview/MoneyPreview';

const Money = ({ value, currency }: MoneyProps) => {
  return (
    <div className={styles.wrapper}>
      <CupIcon className={styles.icon} />
      <MoneyPreview value={value} currency={currency} />
    </div>
  );
};

export default Money;
