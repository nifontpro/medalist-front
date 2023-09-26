import styles from './MainUsers.module.scss';
import { MainUsersProps } from './MainUsers.props';
import cn from 'classnames';
import Htag from '@/ui/Htag/Htag';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import UserListRating from '@/ui/UserListRating/UserListRating';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo, useState } from 'react';
import SelectIntervalDateUsers from '@/ui/SelectIntervalDateUsers/SelectIntervalDateUsers';
import { IOptionInterval } from '@/ui/SelectIntervalDateUsers/SelectIntervalDateUsers.interface';
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
      ) : usersOnDepartmentWithAwards?.data?.length &&
        usersOnDepartmentWithAwards?.data?.length > 0 ? (
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
