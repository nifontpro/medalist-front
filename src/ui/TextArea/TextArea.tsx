import styles from './TextArea.module.scss';
import cn from 'classnames';
import { TextAreaProps } from './TextArea.props';
import { ForwardedRef, forwardRef, memo } from 'react';
import P from '../P/P';

const TextArea = forwardRef(
  (
    { title, placeholder, error, className, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.textareaWrapper)}>
        <P className={styles.placeholder}>{title}</P>
        <textarea
          placeholder={placeholder}
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        <span className={styles.errorMessage}>{error?.message}</span>
      </div>
    );
  }
);

TextArea.displayName = 'description';

export default memo(TextArea);
