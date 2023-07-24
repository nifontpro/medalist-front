import styles from './ButtonScrollUp.module.scss';
import cn from 'classnames';
import UpIcon from '@/icons/up.svg';
import { ButtonScrollUpProps } from './ButtonScrollUp.props';
import Button from '../Button/Button';
import { memo, useCallback, useEffect, useState } from 'react';
import { useScrollY } from '@/hooks/useScrollY';

const ButtonScrollUp = ({
  className,
  ...props
}: ButtonScrollUpProps): JSX.Element => {
  const y = useScrollY();
  const [scroll, setScroll] = useState<number>(0);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const scrollHandler = useCallback((e: any) => {
    setScroll(e.target.documentElement.scrollTop);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <div
      className={cn(
        styles.wrapper,
        {
          [styles.hidden]: scroll == 0,
          [styles.visible]: scroll > 0,
        },
        className
      )}
      {...props}
      onClick={scrollToTop}
    >
      <Button className={styles.buttons} size='m' appearance='blackWhite'>
        Наверх <UpIcon className={styles.icon} />
      </Button>
    </div>
  );
};

export default memo(ButtonScrollUp);
