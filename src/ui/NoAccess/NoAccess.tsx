'use client';

import styles from './NoAccess.module.scss';
import cn from 'classnames';
import { NoAccessProps } from './NoAccess.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import P from '../P/P';
import { memo } from 'react';
import { errorMessageParse } from '@/utils/errorMessageParse';
import QuestionIcon from '@/icons/question.svg';
import RefreshIcon from '@/icons/replay.svg';
import Htag from '../Htag/Htag';
import Button from '../Button/Button';

const NoAccess = ({
  button = true,
  errors,
  className,
  ...props
}: NoAccessProps): JSX.Element => {
  const { back, refresh } = useRouter();

  errorMessageParse(errors);

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.icon}>
          <QuestionIcon />
        </div>
        <div className={styles.textContent}>
          <Htag tag='h1'>Произошла ошибка</Htag>
          <P size='m' fontstyle='thin'>
            К сожалению, произошел сбой. Возможные причины: <br />
            - Ваши действия привели к сбою в работе сервиса <br />
            - На нашем сервисе ведутся технические работы <br />
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
export default memo(NoAccess);
