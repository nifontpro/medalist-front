'use client';

import styles from './ServerError.module.scss';
import cn from 'classnames';
import { ServerErrorProps } from './ServerError.props';
import { useRouter } from 'next/navigation';
import P from '@/ui/P/P';
import { memo } from 'react';
import ErrorIcon from '@/icons/errorNotFoundPageIcon.svg';
import RefreshIcon from '@/icons/errorRefreshIcon.svg';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import { toast } from 'react-toastify';

const ServerError = ({
  error,
  className,
  ...props
}: ServerErrorProps): JSX.Element => {
  const { refresh } = useRouter();

  toast.error(error);

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.icon}>
          <ErrorIcon />
        </div>
        <div className={styles.textContent}>
          <Htag tag='h1'>Произошла ошибка</Htag>
          <P size='m' fontstyle='thin'>
            К сожалению, произошел сбой. <br /> Возможные причины:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Ваши действия привели к сбою в работе сервиса</li>
              <li>На нашем сервисе ведутся технические работы</li>
              <li>Произошел сбой на сервере</li>
            </ul>
            Мы уже работаем над устранением данной проблемы.
          </P>
          <Button
            size='m'
            appearance='blackWhite'
            className={styles.button}
            onClick={refresh}
          >
            <RefreshIcon className='w-[24px] h-[24px]' />
            Пожалуйста, обновите страницу
          </Button>
        </div>
      </div>
    </div>
  );
};
export default memo(ServerError);
