'use client'

import styles from './Input.module.scss';
import cn from 'classnames';
import { InputProps } from './Input.props';
import { ForwardedRef, forwardRef, memo } from 'react';

const Input = forwardRef(({ color, search, error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        className={cn(styles.input, {
          [styles.error]: error,
          [styles.search]: search,
          [styles.gray]: color == 'gray',
          [styles.white]: color == 'white',
        })}
        ref={ref}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
})

Input.displayName = 'Field'

export default memo(Input)
