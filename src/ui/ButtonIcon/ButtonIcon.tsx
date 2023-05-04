import styles from './ButtonIcon.module.scss';
import cn from 'classnames';
import { ButtonProps } from './ButtonIcon.props';

const ButtonIcon = ({
  appearance,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.white]: appearance == 'white',
          [styles.black]: appearance == 'black',
          [styles.gray]: appearance == 'gray',
          [styles.graySilver]: appearance == 'graySilver',
          [styles.lightGray]: appearance == 'lightGray',
          [styles.whiteBlack]: appearance == 'whiteBlack',
          [styles.lime]: appearance == 'lime',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
