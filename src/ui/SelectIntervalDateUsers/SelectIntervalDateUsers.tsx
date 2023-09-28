import { FC } from 'react';

import styles from './SelectIntervalDateUsers.module.scss';
import { IOptionInterval, ISelect } from './SelectIntervalDateUsers.interface';
import ReactSelect, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SelectIntervalDateUsers: FC<ISelect> = ({
  isMulti,
  options,
  isLoading,
  dataInterval,
  setDataInterval,
}) => {
  const onChange = (
    newValue: unknown | OnChangeValue<IOptionInterval, boolean>
  ) => {
    if (newValue) {
      const { value, label } = newValue as IOptionInterval;
      setDataInterval({ value, label });
    }
  };

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>
        {/* <P className={styles.placeholder}>{placeholder}</P> */}
        <ReactSelect
          classNamePrefix='custom-select-interval-date'
          placeholder={'Выберете интервал'}
          options={options}
          value={dataInterval ? dataInterval : options[0]}
          onChange={onChange}
          isMulti={isMulti} // false
          components={animatedComponents}
          isLoading={isLoading}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              neutral80: '#101010',
            },
          })}
        />
      </label>
    </div>
  );
};

export default SelectIntervalDateUsers;
