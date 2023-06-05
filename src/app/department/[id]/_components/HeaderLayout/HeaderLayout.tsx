'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useWindowSize } from '@/hooks/useWindowSize';

const HeaderLayout = () => {
  const pathName = usePathname();
  const { push, back } = useRouter();

  const { windowSize } = useWindowSize();

  const convertPathName = (pathName: string) => {
    const arr = pathName.split('/');
    const link = arr[arr.length - 1];
    if (link == 'users' || link == 'awards' || link == 'statistics') {
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
    'users' | 'awards' | 'statistics' | ''
  >(convertPathName(pathName));

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'users' | 'awards' | 'statistics' | ''
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
      <ButtonCircleIcon
        onClick={back}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        Вернуться назад
      </ButtonCircleIcon>
      {getLastUrl(pathName) === 'edit' ? null : (
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
          className='my-5 w-full justify-center'
          orientation={windowSize.winWidth < 400 ? 'vertical' : 'horizontal'}
        >
          <ToggleButton value=''>Отдел</ToggleButton>
          <ToggleButton value='users'>Сотрудники</ToggleButton>
          <ToggleButton value='awards'>Медали</ToggleButton>
          <ToggleButton value='statistics'>Статистика</ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default HeaderLayout;
