import uniqid from 'uniqid';
import { UsersProps } from './Users.props';

const Users = ({ users, id, className, ...props }: UsersProps) => {
  return (
    <div {...props}>
      <div className='mb-3'>Сотрудники отдела {id}</div>
      {users.map((user) => (
        <div key={uniqid()}>
          {user.firstname} {user.lastname}
        </div>
      ))}
    </div>
  );
};

export default Users;
