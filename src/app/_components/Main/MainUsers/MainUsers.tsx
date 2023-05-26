import styles from './MainUsers.module.scss';
import { MainUsersProps } from './MainUsers.props';
import cn from 'classnames';
// import ArrowIcon from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
// import P from '@/ui/P/P';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/app/user/useUserAdmin';
import UserListRating from '@/ui/UserListRating/UserListRating';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';

const MainUsers = ({ className, ...props }: MainUsersProps): JSX.Element => {
  const { push } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(typeOfUser?.dept.id, { subdepts: true });

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Лучшие сотрудники</Htag>
        {/* <div className={styles.bestUsers} onClick={() => push('/statistic')}>
          <P size='s' fontstyle='thin' className={styles.text}>
            Рейтинг
          </P>
          <ArrowIcon className={styles.arrow} />
        </div> */}
      </div>
      {isLoadingUsersOnDepartmentWithAwards ? (
        <SpinnerSmall />
      ) : (
        <UserListRating
          withoutCountAwards={false}
          users={usersOnDepartmentWithAwards?.data}
          className={styles.userList}
        />
      )}
    </div>
  );
};

export default MainUsers;
