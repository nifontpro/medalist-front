'use client';

import styles from './UserListChoiceUsers.module.scss';
import { UserListChoiceUsersProps } from './UserListChoiceUsers.props';
import cn from 'classnames';
import CheckedIconSvg from '@/icons/checked.svg';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import UserPreview from '@/ui/UserPreview/UserPreview';

const UserListChoiceUsers = ({
  setArrChoiceUser,
  arrChoiceUser,
  allChecked,
  setVisibleCheckbox,
  user,
  className,
  ...props
}: UserListChoiceUsersProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(allChecked);

  useEffect(() => {
    setVisible(allChecked);
  }, [allChecked]);

  const handleClick = useCallback(() => {
    setVisible(!visible);
    setVisibleCheckbox(false);
    let arr = [...arrChoiceUser];
    if (arrChoiceUser.findIndex((item) => item == user.id?.toString()) >= 0) {
      arr.splice(
        arr.findIndex((item) => item == user.id?.toString()),
        1
      );
      setArrChoiceUser(arr);
    } else if (
      arrChoiceUser.findIndex((item) => item == user.id?.toString()) < 0 &&
      user.id
    ) {
      arr.push(user.id.toString());
      setArrChoiceUser(arr);
    }
  }, [arrChoiceUser, setArrChoiceUser, setVisibleCheckbox, user.id, visible]);

  return (
    <div
      onClick={handleClick}
      className={cn(styles.userList, className)}
      {...props}
    >
      <UserPreview forWhat='user' user={user} />
      <CheckedIcon
        className={cn(styles.searchIcon, {
          [styles.visible]:
            arrChoiceUser.find((i) => i == user.id?.toString()) != undefined,
          [styles.hidden]:
            arrChoiceUser.find((i) => i == user.id?.toString()) == undefined,
        })}
      />
    </div>
  );
};

export default memo(UserListChoiceUsers);

//Для мемоизации svg icon
const CheckedIcon = memo(
  ({
    className,
  }: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >): JSX.Element => {
    return <CheckedIconSvg className={className} />;
  }
);
CheckedIcon.displayName = 'CheckedIcon';
//__________________
