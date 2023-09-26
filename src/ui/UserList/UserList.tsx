/* eslint-disable react/display-name */
import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserList.props';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef, memo, useCallback, useState } from 'react';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import UserPreview from '@/ui/UserPreview/UserPreview';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import AuthComponent from '@/store/providers/AuthComponent';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

const UserList = motion(
  forwardRef(
    (
      { user, className, children, ...props }: UserListProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { typeOfUser } = useAppSelector(
        (state: RootState) => state.userSelection
      );

      const { push } = useRouter();

      const { deleteUserAsync } = useUserAdmin();

      const userProfileLink = useCallback(() => {
        push(getUserUrl(`/${user.id}`));
      }, [push, user]);

      const userEditLink = useCallback(() => {
        push(getUserEditUrl(`/${user.id}`));
      }, [push, user]);

      const userDeleteLink = useCallback(() => {
        user?.id && typeOfUser?.id && deleteUserAsync(user.id);
      }, [typeOfUser, user, deleteUserAsync]);

      const [openModalConfirm, setOpenModalConfirm] = useState(false);

      return (
        <>
          <div ref={ref} className={cn(className, styles.container)} {...props}>
            <UserPreview
              user={user}
              className={styles.user}
              forWhat='dept'
              onClick={userProfileLink}
            />
            <AuthComponent minRole={'ADMIN'}>
              <div className={styles.editPanel} {...props}>
                <div className={styles.wrapperIcon} onClick={userEditLink}>
                  <ButtonEdit icon='edit' className={styles.edit} />
                </div>
                <div
                  className={styles.wrapperIcon}
                  // onClick={userDeleteLink}
                  onClick={() => setOpenModalConfirm(true)}
                >
                  <ButtonEdit icon='remove' className={styles.remove} />
                </div>
              </div>
            </AuthComponent>
          </div>
          <ModalConfirm
            title={'Требуется подтверждение!'}
            textBtn={'Удалить'}
            text={`Ваше действие уже нельзя будет отменить. Вы действительно хотите удалить  ${user.firstname} ${user.lastname}?`}
            openModalConfirm={openModalConfirm}
            setOpenModalConfirm={setOpenModalConfirm}
            onConfirm={userDeleteLink}
          />
        </>
      );
    }
  )
);

UserList.displayName = 'UserList';
export default memo(UserList);
