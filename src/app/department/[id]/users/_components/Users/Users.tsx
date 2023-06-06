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
import { getUserCreateUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';
import AuthComponent from '@/store/providers/AuthComponent';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useFetchParams } from '@/hooks/useFetchParams';

const Users = ({ id, className, ...props }: UsersProps) => {
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

  const { usersOnDepartment, isLoadingUsersOnDepartment } = useUserAdmin(id, {
    page: page,
    pageSize: 5,
    filter: searchValue,
    orders: [{ field: 'lastname', direction: state }],
  });

  const totalPage = usersOnDepartment?.pageInfo?.totalPages;

  const { push } = useRouter();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    setPage(0);
  };

  if (isLoadingUsersOnDepartment) return <Spinner />;
  if (!usersOnDepartment?.success) return <NoAccess button={false} />;

  if (usersOnDepartment && usersOnDepartment.data) {
    return (
      <>
        <AuthComponent minRole='ADMIN'>
          <div className={styles.newUser}>
            <ButtonCircleIcon
              onClick={() => push(getUserCreateUrl(`?deptId=${id}`))}
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
            <Htag tag='h3' className={cn(styles.choices)}>
              Сотрудники отдела
            </Htag>
            <SortButton
              state={state}
              onClick={() =>
                state == 'ASC' ? setState('DESC') : setState('ASC')
              }
              className={styles.filter}
            >
              По алфавиту {state == 'ASC' ? 'А -- Я' : 'Я -- А'}
            </SortButton>
          </div>

          <Search
            onChange={handleChange}
            color='white'
            search={true}
            button={false}
            placeholder='Поиск сотрудника...'
          />
          <SortButton
            state={state}
            onClick={() =>
              state == 'ASC' ? setState('DESC') : setState('ASC')
            }
            className={styles.filterMedia}
          >
            По алфавиту {state == 'ASC' ? 'А -- Я' : 'Я -- А'}
          </SortButton>
          {usersOnDepartment.data.length >= 1 ? (
            usersOnDepartment.data?.map((user) => (
              <UserList
                user={user}
                key={uniqid()}
                className={styles.userList}
              />
            ))
          ) : (
            <div className='mt-5'>Нет сотрудников в отделе...</div>
          )}
          {totalPage && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() =>
                usersOnDepartment && nextPage(usersOnDepartment)
              }
              handlePrevClick={prevPage}
            />
          ) : null}
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Users;
