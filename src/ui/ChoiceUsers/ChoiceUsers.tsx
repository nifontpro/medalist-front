'use client';

import styles from './ChoiceUsers.module.scss';
import { ChoiceUsersProps } from './ChoiceUsers.props';
import cn from 'classnames';
import UserList from './UserListChoiceUsers/UserListChoiceUsers';
import { memo, useCallback, useState } from 'react';
import P from '../P/P';
import Search from '../Search/Search';
import Checkbox from '../Checkbox/Checkbox';
import { declOfNum } from '@/utils/declOfNum';

const ChoiceUsers = ({
  users,
  arrChoiceUser,
  setArrChoiceUser,
  setSearchValue,
  className,
  ...props
}: ChoiceUsersProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false);

  const handleChoiceAllUsers = useCallback(() => {
    setAllChecked(!allChecked);
    setVisibleCheckbox(!visibleCheckbox);
    if (!allChecked && arrChoiceUser.length != users.length) {
      let arr: string[] = [];
      users.forEach((item) => item.id && arr.push(item.id.toString()));
      setArrChoiceUser(arr);
      setSearchValue('');
    }
    if (allChecked) {
      setArrChoiceUser([]);
      setSearchValue('');
    }
  }, [
    allChecked,
    arrChoiceUser.length,
    setArrChoiceUser,
    setSearchValue,
    users,
    visibleCheckbox,
  ]);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.length == 0) {
        setSearchValue('');
      } else {
        setSearchValue(event.currentTarget.value);
      }
    },
    [setSearchValue]
  );

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <Search
        onChange={handleChange}
        placeholder='Поиск сотрудника'
        button={false}
        search={true}
        color='white'
      />
      <div className={styles.searchPanel}>
        <P size='s' fontstyle='thin' color='gray' className={styles.countUsers}>
          Выбрано {arrChoiceUser.length}{' '}
          {declOfNum(arrChoiceUser.length, [
            'сотрудник',
            'сотрудника',
            'сотрудников',
          ])}
        </P>

        <Checkbox
          setVisibleCheckbox={setVisibleCheckbox}
          visibleCheckbox={visibleCheckbox}
          icon='check'
          onClick={handleChoiceAllUsers}
        >
          <P size='s' fontstyle='thin'>
            Выбрать всех
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {users?.map((user) => {
          return (
            <UserList
              arrChoiceUser={arrChoiceUser}
              setArrChoiceUser={setArrChoiceUser}
              key={user.id}
              user={user}
              setVisibleCheckbox={setVisibleCheckbox}
              allChecked={allChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(ChoiceUsers);
