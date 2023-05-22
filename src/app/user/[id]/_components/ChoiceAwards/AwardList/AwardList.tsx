import styles from './AwardList.module.scss';
import { AwardListProps } from './AwardList.props';
import cn from 'classnames';
import CheckedIcon from '@/icons/checked.svg';
import { useEffect, useState } from 'react';
import AwardPreview from '@/ui/AwardPreview/AwardPreview';

const AwardList = ({
  setArrChoiceUser,
  arrChoiceUser,
  allChecked,
  setVisibleCheckbox,
  award,
  className,
  ...props
}: AwardListProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(allChecked);

  useEffect(() => {
    setVisible(allChecked);
  }, [allChecked]);

  const handleClick = () => {
    setVisible(!visible);
    setVisibleCheckbox(false);
    let arr = [...arrChoiceUser];
    if (arrChoiceUser.findIndex((item) => item == award.id.toString()) >= 0) {
      arr.splice(
        arr.findIndex((item) => item == award.id.toString()),
        1
      );
      setArrChoiceUser(arr);
    } else if (
      arrChoiceUser.findIndex((item) => item == award.id.toString()) < 0
    ) {
      arr.push(award.id.toString());
      setArrChoiceUser(arr);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(styles.userList, className)}
      {...props}
    >
      <AwardPreview award={award} />
      <CheckedIcon
        className={cn(styles.searchIcon, {
          [styles.visible]: visible,
          [styles.hidden]: !visible,
        })}
      />
    </div>
  );
};

export default AwardList;
