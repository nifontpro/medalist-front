import styles from './ButtonCircleIcon.module.scss';
import cn from 'classnames';
import { ButtonCircleIconProps, icons } from './ButtonCircleIcon.props';
import { ForwardedRef, forwardRef } from 'react';

const ButtonCircleIcon = forwardRef(
  (
    { appearance, icon, disabled, className, children, ...props }: ButtonCircleIconProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const IconComp = icons[icon];

    return (
      <div className={cn(styles.wrapper, {
        [styles.disabled]: disabled
      })} {...props} ref={ref}>
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
          <IconComp className='@apply w-[10px] h-[10px]'/>
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
export default ButtonCircleIcon;