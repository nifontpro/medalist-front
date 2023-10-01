'use client';

import uniqid from 'uniqid';
import { UsersProps } from './Users.props';
import styles from './Users.module.scss';
import Htag from '@/ui/Htag/Htag';
import SortButton from '@/ui/SortButton/SortButton';
import cn from 'classnames';
import Search from '@/ui/Search/Search';
import UserList from '@/ui/UserList/UserList';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import AuthComponent from '@/store/providers/AuthComponent';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useUsers } from './useUsers';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import { memo } from 'react';
import InputFileExcelUsersBtns from '@/ui/InputFileExcelUsersBnts/InputFileExcelUsersBtns';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { deptApi } from '@/api/dept/dept.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const Users = ({ id, className, ...props }: UsersProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const {
    push,
    usersOnDepartment,
    isLoadingUsersOnDepartment,
    countUsers,
    totalPage,
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
    searchHandleChange,
    handleSort,
    handleSortWithoutPage,
    createUser,
    startPage,
  } = useUsers(id);

  const { data: department, isLoading: isLoadingByIdDept } =
    deptApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  if (isLoadingUsersOnDepartment) return <Spinner />;
  if (!usersOnDepartment?.success) return <NoAccess button={false} />;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <>
        <Htag tag='h2' className={styles.titleUsers}>
          Сотрудники
        </Htag>

        <div className={styles.container}>
          {/* <div className={styles.header}>
            <div className={styles.title}>
              <Htag tag='h3' className={cn(styles.choices)}>
                Сотрудники
              </Htag>
              {countUsers && totalPage && (
                <P size='s' fontstyle='thin' className={styles.countAwards}>
                  {countUsers}
                </P>
              )}
            </div>
          </div> */}

          {/* <SwitchDepartOnCompany /> */}

          <div className={styles.headerContainer}>
            <Search
              onChange={searchHandleChange}
              color='white'
              search={true}
              button={false}
              className={styles.search}
              placeholder='Поиск сотрудника...'
            />

            <SortButton
              state={state}
              onClick={handleSort}
              className={styles.filter}
            >
              {state == 'ASC' ? 'А - Я' : 'Я - А'}
            </SortButton>

            <AuthComponent minRole='ADMIN'>
              <div className={styles.addUser}>
                <ButtonCircleIcon
                  onClick={createUser}
                  classNameForIcon='@apply w-[12px] h-[12px]'
                  icon='plus'
                  appearance='black'
                >
                  Сотрудник
                </ButtonCircleIcon>
              </div>
            </AuthComponent>

            <AuthComponent minRole='ADMIN'>
              {department && department.data && (
                <InputFileExcelUsersBtns
                  department={department.data}
                  className={styles.excelBtn}
                >
                  Из EXCEL
                </InputFileExcelUsersBtns>
              )}
            </AuthComponent>

            <AuthComponent minRole='ADMIN'>
              <a
                className={styles.link}
                href='https://storage.yandexcloud.net/medalist/doc/users.xlsx'
              >
                Скачать шаблон
              </a>
            </AuthComponent>
          </div>

          {usersOnDepartment?.data.length >= 1 ? (
            usersOnDepartment?.data?.map((user) => (
              <UserList
                user={user}
                key={uniqid()}
                className={cn(styles.userList, 'userCard')}
              />
            ))
          ) : (
            <div className='mt-5'>Нет сотрудников в отделе...</div>
          )}
        </div>

        {totalPage && usersOnDepartment && totalPage > 1 ? (
          <PrevNextPages
            className='mb-[50px]'
            startPage={startPage}
            endPage={totalPage}
            handleNextClick={() => nextPage(usersOnDepartment)}
            handlePrevClick={prevPage}
          />
        ) : null}

        <ButtonScrollUp />
        {/* {totalPage === page + 1 && <ButtonScrollUp />} */}
      </>
    );
  } else {
    return null;
  }
};

export default memo(Users);
