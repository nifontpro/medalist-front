import uniqid from 'uniqid';
import { UsersProps } from './Users.props';
import UserList from '@/ui/UserList/UserList';
import styles from './Users.module.scss'

const Users = ({ users, id, className, ...props }: UsersProps) => {
  return (
    <div className={styles.wrapper} {...props}>
      <div className='mb-3'>Сотрудники отдела {id}</div>
      {users.map((user) => (
        <UserList user={user} key={uniqid()} />
      ))}
    </div>
  );
};

export default Users;
