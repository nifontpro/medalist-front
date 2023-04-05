'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { HeaderLayoutProps } from './HeaderLayout.props';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';

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

  const [alignment, setAlignment] = useState<'users' | 'medals' | 'statistic' | '' >(
    convertPathName(pathName)
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'users' | 'medals' | 'statistic' | ''
  ) => {
    ``;
    push(`${pathName.replace(alignment, newAlignment)}`);
    setAlignment(newAlignment);
  };
  return (
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
  );
};

export default HeaderLayout;
