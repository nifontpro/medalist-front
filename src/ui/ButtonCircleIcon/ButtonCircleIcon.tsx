import styles from './ButtonCircleIcon.module.scss';
import cn from 'classnames';
import { ButtonCircleIconProps, icons } from './ButtonCircleIcon.props';
import { ForwardedRef, forwardRef, memo, useMemo } from 'react';

const ButtonCircleIcon = forwardRef(
  (
    {
      appearance,
      icon,
      disabled,
      className,
      classNameForIcon,
      children,
      ...props
    }: ButtonCircleIconProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const IconComp = useMemo(() => icons[icon], [icon]);

    return (
      <div
        className={cn(styles.wrapper, {
          [styles.disabled]: disabled,
        })}
        {...props}
        ref={ref}
      >
        <button
          className={cn(
            styles.button,
            {
              [styles.black]: appearance == 'black',
              [styles.transparent]: appearance == 'transparent',
              [styles.white]: appearance == 'white',
            },
            className
          )}
        >
          <IconComp className={classNameForIcon} />
        </button>
        <span
          className={cn({
            [styles.blackText]: appearance == 'black',
            [styles.transparentText]: appearance == 'transparent',
          })}
        >
          {children}
        </span>
      </div>
    );
  }
);

ButtonCircleIcon.displayName = 'ButtonCircleIcon';
export default memo(ButtonCircleIcon);
