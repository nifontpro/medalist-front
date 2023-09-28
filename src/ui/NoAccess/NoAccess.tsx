'use client';

import styles from './NoAccess.module.scss';
import cn from 'classnames';
import { NoAccessProps } from './NoAccess.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import P from '../P/P';
import { memo } from 'react';

const NoAccess = ({
  button = true,
  className,
  ...props
}: NoAccessProps): JSX.Element => {
  const { back } = useRouter();

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      {button && (
        <ButtonCircleIcon
          onClick={back}
          classNameForIcon=''
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>
      )}
      <P fontstyle='thin' className={styles.text}>
        Не достаточно прав доступа или такой страницы не существует. Уточните
        информацию у администратора.
      </P>
    </div>
  );
};
export default memo(NoAccess)
