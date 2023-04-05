import styles from './Button.module.scss';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import { ForwardedRef, forwardRef } from 'react';

const Button = forwardRef(
  (
    { appearance, children, size, className, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        className={cn(
          styles.button,
          {
            [styles.white]: appearance == 'white',
            [styles.whiteBlack]: appearance == 'whiteBlack',
            [styles.gray]: appearance == 'gray',
            [styles.blackWhite]: appearance == 'blackWhite',
            [styles.blackGray]: appearance == 'blackGray',
            [styles.thin]: size == 'thin',
            [styles.s]: size == 's',
            [styles.m]: size == 'm',
            [styles.l]: size == 'l',
            [styles.x]: size == 'x',
          },
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
