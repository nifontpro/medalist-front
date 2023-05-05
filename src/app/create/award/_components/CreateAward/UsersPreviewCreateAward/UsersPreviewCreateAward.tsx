import { User } from '@/domain/model/user/user';
import styles from './UsersPreviewCreateAward.module.scss';
import { UsersPreviewCreateAwardProps } from './UsersPreviewCreateAward.props';
import cn from 'classnames';
import P from '@/ui/P/P';
import { declOfNum } from '@/utils/declOfNum';
import UserPreview from '@/ui/UserPreview/UserPreview';
import FilterCreateAward from '../FilterCreateAward/FilterCreateAward';

const UsersPreviewCreateAward = ({
  users,
  arrChoiceUser,
  setArrChoiceUser,
  className,
  ...props
}: UsersPreviewCreateAwardProps): JSX.Element => {
  const selectedUsers: User[] = [];
  users.forEach((user) => {
    arrChoiceUser.forEach((id) => {
      if (user.id?.toString() == id) {
        selectedUsers.push(user);
      }
    });
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P className={styles.title}>Сотрудники</P>
      <P className={styles.countUsers} color='gray'>
        Выбрано {arrChoiceUser.length}{' '}
        {declOfNum(arrChoiceUser.length, [
          'сотрудник',
          'сотрудника',
          'сотрудников',
        ])}
      </P>
      {selectedUsers.map((user) => {
        return (
          <UserPreview
            key={user.id}
            user={user}
            forWhat='user'
            className={styles.list}
          />
        );
      })}

      <FilterCreateAward
        users={users}
        arrChoiceUser={arrChoiceUser}
        setArrChoiceUser={setArrChoiceUser}
      />
    </div>
  );
};

export default UsersPreviewCreateAward;
