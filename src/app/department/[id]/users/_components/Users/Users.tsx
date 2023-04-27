'use client';

import uniqid from 'uniqid';
import { UsersProps } from './Users.props';
import styles from './Users.module.scss';
import Htag from '@/ui/Htag/Htag';
import SortButton from '@/ui/SortButton/SortButton';
import cn from 'classnames';
import { useState } from 'react';
import Search from '@/ui/Search/Search';
import UserList from '@/ui/UserList/UserList';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { getUserCreateUrl } from '@/config/api.config';
import { useRouter } from 'next/navigation';

const Users = ({ users, id, className, ...props }: UsersProps) => {
  const { push } = useRouter();

  //Сотртировка по фамилии
  const [state, setState] = useState<1 | -1>(1);
  // if (filteredValue !== undefined) {
  //   filteredValue.sort((prev, next): number => {
  //     if (prev.lastname !== undefined && next.lastname !== undefined) {
  //       if (prev?.lastname > next?.lastname) return state; //(-1)
  //     }
  //     return 1;
  //   });
  // }

  return (
    <>
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
      <div className={styles.container}>
        <div className={styles.header}>
          <Htag tag='h3' className={cn(styles.choices)}>
            Сотрудники отдела {id}
          </Htag>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.filter}
          >
            По алфавиту {state == 1 ? 'А -- Я' : 'Я -- А'}
          </SortButton>
        </div>

        <Search
          // onChange={handleChange}
          color='white'
          search={true}
          button={false}
          placeholder='Поиск сотрудника...'
        />
        <SortButton
          state={state}
          onClick={() => (state == 1 ? setState(-1) : setState(1))}
          className={styles.filterMedia}
        >
          По алфавиту {state == 1 ? 'А -- Я' : 'Я -- А'}
        </SortButton>
        {users.length >= 1 ? (
          users.map((user) => (
            <UserList user={user} key={uniqid()} className={styles.userList} />
          ))
        ) : (
          <div className='mt-5'>Нет сотрудников в отделе...</div>
        )}
      </div>
    </>
  );
};

export default Users;
