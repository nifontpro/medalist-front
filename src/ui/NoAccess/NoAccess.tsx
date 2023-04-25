'use client';

import styles from './NoAccess.module.scss';
import cn from 'classnames';
import { NoAccessProps } from './NoAccess.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import P from '../P/P';

const NoAccess = ({ className, ...props }: NoAccessProps): JSX.Element => {
  const { back } = useRouter();
  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <P fontstyle='thin' className={styles.text}>
        Не достаточно прав доступа. Уточните информацию у администратора.
      </P>
    </div>
  );
};
export default NoAccess;
