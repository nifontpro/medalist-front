'use client';

import styles from './NoAccess.module.scss';
import cn from 'classnames';
import { NoAccessProps } from './NoAccess.props';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import P from '../P/P';
import { memo } from 'react';
import { errorMessageParse } from '@/utils/errorMessageParse';

const NoAccess = ({
  button = true,
  errors,
  className,
  ...props
}: NoAccessProps): JSX.Element => {
  const { back } = useRouter();

  errorMessageParse(errors);

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
        Произошла какая то ошибка. Попробуйте еще раз.
      </P>
    </div>
  );
};
export default memo(NoAccess);
