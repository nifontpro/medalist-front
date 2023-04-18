'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { userApi } from '@/api/user/user.api';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import {
  setIsOpen,
  setTypeOfUser_IsOpen,
} from '@/store/features/userSelection/userSelection.slice';
import { usePathname } from 'next/navigation';

const UserSelection = ({ className, ...props }: UserSelectionProps) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser, isOpen } = useAppSelector((state) => state.userSelection);

  const { data: rolesUser, isLoading } = userApi.useGetProfilesQuery(
    undefined,
    {
      skip: !isAuth,
    }
  );

  return (
    <>
      {isAuth &&
      typeOfUser != undefined &&
      !isOpen ||
      pathName == '/login' ? null : (
        <div className={cn(styles.wrapper, className)} {...props}>
          {!isLoading && (
            <div className={styles.window}>
              <Htag tag='h2' className={styles.header}>
                Выберите профиль
              </Htag>
              {rolesUser ? (
                rolesUser.data!.map((role) => {
                  return (
                    <div
                      key={uniqid()}
                      className={styles.role}
                      onClick={() => dispatch(setTypeOfUser_IsOpen(role))}
                    >
                      {role.id}
                    </div>
                  );
                })
              ) : (
                <div className='text-center'>Нет аккаунтов</div>
              )}
              <Htag
                tag='h3'
                className={styles.create}
                onClick={() => dispatch(setIsOpen(false))}
              >
                Создать аккаунт
              </Htag>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserSelection;
