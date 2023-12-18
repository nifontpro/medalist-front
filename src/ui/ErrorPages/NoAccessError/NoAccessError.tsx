'use client';

import styles from './NoAccessError.module.scss';
import cn from 'classnames';
import { NoAccessErrorProps } from './NoAccessError.props';
import P from '@/ui/P/P';
import { memo } from 'react';
import { errorMessageParse } from '@/utils/errorMessageParse';
import LocedIcon from '@/icons/errorNoAccessIcon.svg';
import ExitIcon from '@/icons/exit.svg';
import Htag from '@/ui/Htag/Htag';
import Button from '@/ui/Button/Button';
import { useHandleLogout } from '@/app/_components/MainLayout/Header/UserLogo/UserPanelModalWindow/useHandleLogout';

const NoAccessError = ({
  errors,
  className,
  ...props
}: NoAccessErrorProps): JSX.Element => {
  if (errors) errorMessageParse(errors);

  const { handleLogoutClick } = useHandleLogout();

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.contentWrapper}>
        <div className={styles.icon}>
          <LocedIcon />
        </div>
        <div className={styles.textContent}>
          <Htag tag='h1'>Ошибка доступа</Htag>
          <P size='m' fontstyle='thin'>
            Вы не можете просмотреть содержимое этой страницы.
            <br />
            Возможные причины:
            <br />
            - Вы не являетесь администратором
            <br />
            - Это содержимое отдела или сотрудника, принадлежащих чужой компании
            <br />- Произошел сбой на сервере
          </P>
          <Button
            size='m'
            appearance='blackWhite'
            className={styles.button}
            onClick={handleLogoutClick}
          >
            <ExitIcon className={styles.icon} />
            Попробуйте выйти и авторизоваться заново
          </Button>
        </div>
      </div>
    </div>
  );
};
export default memo(NoAccessError);
