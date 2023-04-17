'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import { useAppSelector } from '@/store/hooks/hooks';
import { userApi } from '@/api/user/user.api';

const UserSelection = ({ className, ...props }: UserSelectionProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  // if (isAuth === true) {
    const { data } = userApi.useGetProfilesQuery(undefined,{skip: !isAuth});
    console.log(data);
  // }

  return (
    <>
      {isAuth === true && typeOfUser.length == 0 ? null : (
        <div className={cn(styles.wrapper, className)} {...props}>
          <div className={styles.window}>Выберите пользователя</div>
        </div>
      )}
    </>
  );
};

export default UserSelection;
