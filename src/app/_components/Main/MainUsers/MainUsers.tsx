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
      ) : (
        <div className={styles.contentWrapper}>
          <UserListRating
            withoutCountAwards={false}
            users={usersOnDepartmentWithAwards?.data}
            className={styles.userList}
            page={page}
            pageSize={pageSize}
          />
          {totalPage && usersOnDepartmentWithAwards && totalPage > 1 ? (
            <PrevNextPages
              startPage={startPage}
              endPage={totalPage}
              handleNextClick={() => nextPage(usersOnDepartmentWithAwards)}
              handlePrevClick={prevPage}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default memo(MainUsers);
