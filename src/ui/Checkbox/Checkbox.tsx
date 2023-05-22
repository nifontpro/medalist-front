import styles from './Checkbox.module.scss';
import cn from 'classnames';
import { CheckboxProps, icons } from './Checkbox.props';

const Checkbox = ({
  setVisibleCheckbox,
  visibleCheckbox,
  icon,
  className,
  children,
  ...props
}: CheckboxProps): JSX.Element => {
  const IconComp = icons[icon];

  return (
    <div
      onClick={() => setVisibleCheckbox(!visibleCheckbox)}
      className={cn(styles.wrapper, className)}
      {...props}
    >
      <div className={cn(styles.checkbox)}>
        <IconComp
          className={cn(styles.check, {
            [styles.hidden]: !visibleCheckbox,
            [styles.visible]: visibleCheckbox,
          })}
        />
      </div>
      {children}
    </div>
  );
};

export default Checkbox;
