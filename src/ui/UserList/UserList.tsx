/* eslint-disable react/display-name */
import styles from './UserList.module.scss';
import cn from 'classnames';
import { UserListProps } from './UserListprops';
// import { useUserAdmin } from '../admin/useUserAdmin';
import { useRouter } from 'next/navigation';
// import { getUserEditUrl, getUserUrl } from '@/core/config/api.config';
// import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import UserPreview from '@/ui/UserPreview/UserPreview';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';

const UserList = motion(
  forwardRef(
    (
      { user, className, children, ...props }: UserListProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const { push } = useRouter();
      // const { deleteAsync } = useUserAdmin();

      return (
        <div ref={ref} className={cn(className, styles.container)} {...props}>
          <UserPreview
            user={user}
            className={styles.user}
            forWhat='user'
            onClick={() => push(getUserUrl(`/${user.id}`))}
          />
          {/* <AuthComponent minRole={'director'}> */}
            <div className={styles.editPanel} {...props}>
              <div
                className={styles.wrapperIcon}
                onClick={() => push(getUserEditUrl(`/${user.id}`))}
              >
                <ButtonEdit icon='edit' className={styles.edit} />
              </div>
              <div
                className={styles.wrapperIcon}
                // onClick={() => deleteAsync(user.id)}
              >
                <ButtonEdit icon='remove' className={styles.remove} />
              </div>
            </div>
          {/* </AuthComponent> */}
        </div>
      );
    }
  )
);

UserList.displayName = 'UserList';
export default UserList;
