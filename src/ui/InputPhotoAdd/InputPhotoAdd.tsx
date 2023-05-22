import styles from './InputPhotoAdd.module.scss';
import cn from 'classnames';
import { InputPhotoAddProps } from './InputPhotoAdd.props';
import { ForwardedRef, forwardRef } from 'react';

const InputPhotoAdd = forwardRef(
  (
    { error, className, children, ...props }: InputPhotoAddProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input type='file' className={styles.inputFile} ref={ref} {...props} />
        {children}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

InputPhotoAdd.displayName = 'file';

export default InputPhotoAdd;
