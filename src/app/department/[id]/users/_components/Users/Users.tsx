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
import P from '@/ui/P/P';
import { useUsers } from './useUsers';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import { memo } from 'react';

const Users = ({ id, className, ...props }: UsersProps) => {
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
  } = useUsers(id);

  if (isLoadingUsersOnDepartment) return <Spinner />;
  if (!usersOnDepartment?.success) return <NoAccess button={false} />;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <>
        <AuthComponent minRole='ADMIN'>
          <div className={styles.newUser}>
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
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Htag tag='h3' className={cn(styles.choices)}>
                Сотрудники отдела
              </Htag>
              {countUsers && totalPage && (
                <P size='s' fontstyle='thin' className={styles.countAwards}>
                  {countUsers}
                </P>
              )}
            </div>

            <SortButton
              state={state}
              onClick={handleSort}
              className={styles.filter}
            >
              По алфавиту {state == 'ASC' ? 'А -- Я' : 'Я -- А'}
            </SortButton>
          </div>

          <Search
            onChange={searchHandleChange}
            color='white'
            search={true}
            button={false}
            placeholder='Поиск сотрудника...'
          />
          <SortButton
            state={state}
            onClick={handleSortWithoutPage}
            className={styles.filterMedia}
          >
            По алфавиту {state == 'ASC' ? 'А -- Я' : 'Я -- А'}
          </SortButton>
          {usersOnDepartment?.data.length >= 1 ? (
            usersOnDepartment?.data?.map((user) => (
              <UserList
                user={user}
                key={uniqid()}
                className={styles.userList}
              />
            ))
          ) : (
            <div className='mt-5'>Нет сотрудников в отделе...</div>
          )}
          {/* {totalPage && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() =>
                usersOnDepartment && nextPage(usersOnDepartment)
              }
              handlePrevClick={prevPage}
            />
          ) : null} */}
        </div>

        {totalPage === page + 1 && <ButtonScrollUp />}
      </>
    );
  } else {
    return null;
  }
};

export default memo(Users);
