'use client';

import styles from './UserSelection.module.scss';
import cn from 'classnames';
import { UserSelectionProps } from './UserSelection.props';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import { useUserSelection } from './useUserSelection';
import { getOwnerCreateUrl, getUserCreateUrl } from '@/config/api.config';
import ExitIcon from '@/icons/close.svg';

const UserSelection = ({ className, ...props }: UserSelectionProps) => {
  const {
    isAuth,
    typeOfUser,
    isOpen,
    pathName,
    rolesUser,
    handleChangeRole,
    isLoading,
    push,
    dispatch,
    setIsOpen
  } = useUserSelection();

  return (
    <>
      {(isAuth && typeOfUser != undefined && !isOpen) ||
      pathName == '/login' ||
      pathName == '/create/owner' ? null : (
        <div className={cn(styles.wrapper, className)} {...props}>
          {!isLoading && (
            <div className={styles.window}>
              <ExitIcon onClick={() => dispatch(setIsOpen(false))} className={styles.exit} />
              <Htag tag='h2' className={styles.header}>
                Выберите профиль
              </Htag>
              {rolesUser ? (
                rolesUser.data!.map((role) => {
                  return (
                    <div
                      key={uniqid()}
                      className={styles.role}
                      onClick={() => handleChangeRole(role)}
                    >
                      id: {role.id} <br />
                      {role.dept.name}
                    </div>
                  );
                })
              ) : (
                <div className='text-center'>Нет аккаунтов</div>
              )}
              <Htag
                tag='h3'
                className={styles.create}
                onClick={() => push(getOwnerCreateUrl())}
              >
                Зарегестрироваться как владелец
              </Htag>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserSelection;
