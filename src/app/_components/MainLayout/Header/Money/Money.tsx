import P from '@/ui/P/P';
import styles from './Money.module.scss';
import { MoneyProps } from './Money.props';
import CupIcon from '@/icons/cup.svg';

const Money = ({ value, currency }: MoneyProps) => {
  return (
    <div className={styles.wrapper}>
      <CupIcon className={styles.icon} />
      <P size='s' color='white'>
        {value}&nbsp;{currency}
      </P>
    </div>
  );
};

export default Money;
