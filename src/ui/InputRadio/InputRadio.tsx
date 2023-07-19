import styles from './InputRadio.module.scss';
import cn from 'classnames';
import { InputRadioProps } from './InputRadio.props';
import { memo } from 'react';

const InputRadio = ({
  active,
  setActive,
  className,
  ...props
}: InputRadioProps): JSX.Element => {
  return (
    <div className={cn(className, styles.radioButton)} {...props}>
      <div
        onClick={() => setActive('MALE')}
        className={cn(styles.btn, {
          [styles.btnActive]: active === 'MALE',
        })}
      >
        Муж
      </div>

      <div
        onClick={() => setActive('FEMALE')}
        className={cn(styles.btn, {
          [styles.btnActive]: active === 'FEMALE',
        })}
      >
        Жен
      </div>
    </div>
  );
};
InputRadio.displayName = 'radio';

export default memo(InputRadio);
