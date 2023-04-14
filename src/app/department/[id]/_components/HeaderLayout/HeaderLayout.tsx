'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const HeaderLayout = () => {
  const pathName = usePathname();
  const { push } = useRouter();

  const convertPathName = (pathName: string) => {
    const arr = pathName.split('/');
    const link = arr[arr.length - 1];
    if (link == 'users' || link == 'medals' || link == 'statistic') {
      return link;
    } else return '';
  };

  const getLastUrl = (string: string) => {
    const arr = pathName.split('/');
    const link = arr[arr.length - 1];
    if (link == 'edit') {
      return link;
    } else return '';
  };

  const [alignment, setAlignment] = useState<
    'users' | 'medals' | 'statistic' | ''
  >(convertPathName(pathName));

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'users' | 'medals' | 'statistic' | ''
  ) => {
    if (newAlignment === null) {
      push(pathName);
    }
    if (convertPathName(pathName) !== '') {
      push(`${pathName.replace(alignment, newAlignment)}`);
    } else {
      push(`${pathName}/${newAlignment}`);
    }
    setAlignment(newAlignment);
  };

  return (
    <>
      {getLastUrl(pathName) === 'edit' ? null : (
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
          className='mb-5 w-full justify-center'
        >
          <ToggleButton value='users'>Сотрудники</ToggleButton>
          <ToggleButton value='medals'>Медали</ToggleButton>
          <ToggleButton value='statistic'>Статистика</ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default HeaderLayout;
