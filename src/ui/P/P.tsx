import styles from './P.module.scss';
import cn from 'classnames';
import { PProps } from './P.props';
import { memo } from 'react';

const P = ({
  size = 'm',
  fontstyle,
  color,
  type,
  children,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(
        styles.p,
        {
          [styles.xs]: size == 'xs',
          [styles.s]: size == 's',
          [styles.m]: size == 'm',
          [styles.l]: size == 'l',
          [styles.ll]: size == 'll',
          [styles.xl]: size == 'xl',
          [styles.thin]: fontstyle == 'thin',
          [styles.bold]: fontstyle == 'bold',
          [styles.gray]: color == 'gray',
          [styles.graySilver]: color == 'graySilver',
          [styles.gray96]: color == 'gray96',
          [styles.white]: color == 'white',
          [styles.black]: color == 'black',
          [styles.silverBtn]: type == 'silverBtn',
          [styles.grayBtn]: type == 'grayBtn',
          [styles.limeBtn]: type == 'limeBtn',
        },
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default memo(P);
