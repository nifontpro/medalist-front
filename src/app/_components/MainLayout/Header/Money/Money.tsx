import styles from './Money.module.scss';
import { MoneyProps } from './Money.props';
import CupIcon from '@/icons/cup.svg';
import MoneyPreview from '@/ui/MoneyPreview/MoneyPreview';
import { useRouter } from 'next/navigation';

const Money = ({ value, currency }: MoneyProps) => {
  const { push } = useRouter();

  return (
    <div className={styles.wrapper} onClick={() => push('/gifts')}>
      <CupIcon className={styles.icon} />
      <MoneyPreview value={value} currency={currency} />
    </div>
  );
};

export default Money;
