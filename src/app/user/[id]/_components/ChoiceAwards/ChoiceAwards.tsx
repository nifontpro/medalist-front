'use client';

import styles from './ChoiceAwards.module.scss';
import { ChoiceAwardsProps } from './ChoiceAwards.props';
import cn from 'classnames';
import { useState } from 'react';
import AwardList from './AwardList/AwardList';
import P from '@/ui/P/P';
import Search from '@/ui/Search/Search';
import { declOfNum } from '@/utils/declOfNum';
import Checkbox from '@/ui/Checkbox/Checkbox';

const ChoiceAwards = ({
  awards,
  arrChoiceAward,
  setArrChoiceAward,
  setSearchValue,
  className,
  ...props
}: ChoiceAwardsProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false);

  const handleChoiceAllAwards = () => {
    setAllChecked(!allChecked);
    setVisibleCheckbox(!visibleCheckbox);
    if (!allChecked && arrChoiceAward.length != awards.length) {
      let arr: string[] = [];
      awards.forEach((item) => arr.push(item.id.toString()));
      setArrChoiceAward(arr);
      setSearchValue('');
    }
    if (allChecked) {
      setArrChoiceAward([]);
      setSearchValue('');
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length == 0) {
      setSearchValue('');
    } else {
      setSearchValue(event.currentTarget.value);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P className={styles.searchTitle}>Поиск</P>
      <Search
        onChange={handleChange}
        placeholder='Поиск награды'
        button={false}
        search={true}
        color='white'
      />
      <div className={styles.searchPanel}>
        <P size='s' fontstyle='thin' color='gray'>
          Выбрано {arrChoiceAward.length}{' '}
          {declOfNum(arrChoiceAward.length, ['медаль', 'медали', 'медалей'])}
        </P>

        <Checkbox
          setVisibleCheckbox={setVisibleCheckbox}
          visibleCheckbox={visibleCheckbox}
          icon='check'
          onClick={handleChoiceAllAwards}
        >
          <P size='s' fontstyle='thin'>
            Выбрать все
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {awards?.map((award) => {
          return (
            <AwardList
              arrChoiceUser={arrChoiceAward}
              setArrChoiceUser={setArrChoiceAward}
              key={award.id}
              award={award}
              setVisibleCheckbox={setVisibleCheckbox}
              allChecked={allChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceAwards;
