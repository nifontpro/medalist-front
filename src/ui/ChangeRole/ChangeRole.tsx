import { ChangeRoleProps } from './ChangeRole.props';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import styles from './ChangeRole.module.scss';
import cn from 'classnames';
import { setIsOpen } from '@/store/features/userSelection/userSelection.slice';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/app/user/useUserAdmin';

const ChangeRole = ({ className }: ChangeRoleProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const { singleUser } = useUserAdmin(String(typeOfUser?.id));

  return (
    <>
      <div
        className={cn(styles.role, className)}
        onClick={() => dispatch(setIsOpen(true))}
      >
        {singleUser?.success == false
          ? `Выберете пользователя`
          : `${singleUser?.data?.user.firstname} ${singleUser?.data?.user.lastname}`}
      </div>
    </>
  );
};
export default ChangeRole;
