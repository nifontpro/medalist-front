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
import { memo, useMemo } from 'react';

const MainUsers = ({
  deptId,
  className,
  ...props
}: MainUsersProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const switcher = useAppSelector((state) => state.switcher);

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();
  const pageSize: number = useMemo(() => 8, []);
  const startPage: number = useMemo(() => page + 1, [page]);

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(deptId ? deptId : typeOfUser?.dept.id, {
      orders: [{ field: '(awardCount)', direction: 'DESC' }],
      // subdepts: switcher,
      subdepts: true,
      page: page,
      pageSize,
    });

  console.log(usersOnDepartmentWithAwards);

  const totalPage = useMemo(
    () => usersOnDepartmentWithAwards?.pageInfo?.totalPages,
    [usersOnDepartmentWithAwards]
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Лучшие сотрудники</Htag>
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
