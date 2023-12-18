'use client';

import styles from './NotFoundPageError.module.scss';
import cn from 'classnames';
import { NotFoundPageErrorProps } from './NotFoundPageError.props';
import { useRouter } from 'next/navigation';
import P from '@/ui/P/P';
import { memo } from 'react';
import QuestionIcon from '@/icons/question.svg';
import CompanyIcon from '@/icons/company.svg';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';

const NotFoundPageError = ({
  className,
  ...props
}: NotFoundPageErrorProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.icon}>
          <QuestionIcon />
        </div>
        <div className={styles.textContent}>
          <Htag tag='h1'>Страница не найдена</Htag>
          <P size='m' fontstyle='thin'>
            Страница, которую вы запрашиваете не существует.
            <br />
            Возможные причины:
            <br />
            - Вы ввели ошибочный адрес страницы <br />
            - Страница устарела и была удалена <br />- Произошел сбой на сервере
          </P>
          <Button
            size='m'
            appearance='blackWhite'
            className={styles.button}
            onClick={() => push('/')}
          >
            <CompanyIcon className='w-[24px] h-[24px]' />
            Вернуться на глвную страницу
          </Button>
        </div>
      </div>
    </div>
  );
};
export default memo(NotFoundPageError);
