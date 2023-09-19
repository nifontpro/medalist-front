import Button from '@/ui/Button/Button';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import React from 'react';

import styles from './WindowWithoutRoles.module.scss';
import { WindowWithoutRolesProps } from './WindowWithoutRoles.props';
import { useRouter } from 'next/navigation';
import { getOwnerCreateUrl } from '@/config/api.config';

const WindowWithoutRoles = ({ handleLogoutClick }: WindowWithoutRolesProps) => {
  const { push } = useRouter();

  return (
    <div className={styles.wrapper}>
      <Htag tag='h1'>Медалист приветствует Вас!</Htag>

      <div>
        <P size='s'>Рады что Вы с нами!</P>
        <P size='s'>
          Решите, в какой роли вы хотите видеть себя на нашем сервисе:
        </P>
      </div>

      <P size='s' fontstyle='thin'>
        Вы владелец или представитель компании, и хотите ее зарегистрировать на
        нашей платформе:
      </P>

      <Button
        onClick={() => push(getOwnerCreateUrl())}
        appearance='blackWhite'
        size='l'
      >
        Зарегистрировать свою компанию на Медалисте
      </Button>

      <P size='s' fontstyle='thin'>
        Вы сотрудник компании и ожидаете приглашения в своё подразделение:
      </P>

      <Button appearance='blackWhite' size='l' disabled>
        Ожидайте прихода уведомления на вашу почту
      </Button>

      <P size='s' fontstyle='thin'>
        Вы заинтересовались сервисом Медалист, но пока не определились со своей
        ролью на сервисе:
      </P>

      <Button onClick={handleLogoutClick} appearance='whiteBlack' size='l'>
        Выйти
      </Button>
    </div>
  );
};

export default WindowWithoutRoles;
