import styles from './ButtonEdit.module.scss';
import cn from 'classnames';
import { ButtonEditProps, icons } from './ButtonEdit.props';
import { ForwardedRef, forwardRef } from 'react';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';

const ButtonEdit = forwardRef(
  (
    { icon, className, children, ...props }: ButtonEditProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const IconComp = icons[icon];

    return (
      <div className={cn(styles.wrapper)} {...props} ref={ref}>
        {icon == 'edit' && (
          <button className={cn(styles.buttonEdit, className)}>
            <ImageDefault
              src={IconComp}
              width={76}
              height={76}
              alt=''
              objectFit='cover'
              // className='rounded-xl'
            />
          </button>
        )}{' '}
        {icon == 'remove' && (
          <button className={cn(styles.buttonRemove, className)}>
            <ImageDefault
              src={IconComp}
              width={76}
              height={76}
              alt=''
              objectFit='cover'
              // className='rounded-xl'
            />
          </button>
        )}
        {icon == 'refresh' && (
          <button className={cn(styles.buttonRefresh, className)}>
            <ImageDefault
              src={IconComp}
              width={76}
              height={76}
              alt=''
              objectFit='cover'
              // className='rounded-xl'
            />
          </button>
        )}
      </div>
    );
  }
);

ButtonEdit.displayName = 'ButtonEdit';
export default ButtonEdit;
