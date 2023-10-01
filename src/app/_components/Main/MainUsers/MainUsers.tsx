import styles from './MainUsers.module.scss';
import { MainUsersProps } from './MainUsers.props';
import cn from 'classnames';
import Htag from '@/ui/Htag/Htag';
import UserListRating from '@/ui/UserListRating/UserListRating';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { memo } from 'react';
import SelectIntervalDateUsers from '@/ui/SelectIntervalDateUsers/SelectIntervalDateUsers';
import { useMainUsers } from './useMainUsers';
import P from '@/ui/P/P';

const MainUsers = ({
  deptId,
  className,
  ...props
}: MainUsersProps): JSX.Element => {
  const {
    dataInterval,
    setDataInterval,
    roles,
    isLoadingUsersOnDepartmentWithAwards,
    usersOnDepartmentWithAwards,
    page,
    pageSize,
    totalPage,
    startPage,
    nextPage,
    prevPage,
  } = useMainUsers(deptId);

  let currentRank = 1;

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Лучшие сотрудники</Htag>
        <SelectIntervalDateUsers
          dataInterval={dataInterval}
          setDataInterval={setDataInterval}
          options={roles || []}
          isLoading={false}
          isMulti={false}
        />
      </div>
      {isLoadingUsersOnDepartmentWithAwards ? (
        <div className='h-[300px]'>
          <SpinnerSmall />
        </div>
      ) : usersOnDepartmentWithAwards?.data &&
        usersOnDepartmentWithAwards.data.filter((user) => user.awardCount > 0)
          .length > 0 ? (
        <div className={styles.contentWrapper}>
          <UserListRating
            currentRank={currentRank}
            withoutCountAwards={false}
            users={usersOnDepartmentWithAwards?.data}
            className={styles.userList}
            page={page}
            pageSize={pageSize}
          />

          {/* {totalPage && usersOnDepartmentWithAwards && totalPage > 1 ? (
            <PrevNextPages
              startPage={startPage}
              endPage={totalPage}
              handleNextClick={() => nextPage(usersOnDepartmentWithAwards)}
              handlePrevClick={prevPage}
            />
          ) : null} */}
        </div>
      ) : (
        <P size='s' fontstyle='thin'>
          На данный момент лучших сотрудников нет
        </P>
      )}
    </div>
  );
};

export default memo(MainUsers);
