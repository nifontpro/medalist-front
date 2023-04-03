import uniqid from 'uniqid';
import { UsersProps } from './Users.props';

const Users = ({ users, className, ...props }: UsersProps) => {
  return (
    <div {...props}>
      {users.map((user) => (
        <div key={uniqid()}>
          {user.firstname} {user.lastname}
        </div>
      ))}
    </div>
  );
};

export default Users;
