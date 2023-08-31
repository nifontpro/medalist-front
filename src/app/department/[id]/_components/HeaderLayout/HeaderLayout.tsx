'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useWindowSize } from '@/hooks/useWindowSize';
import { convertPathName } from './convertPathName';
import { getLastUrl } from './getLastUrl';

type Alignment = 'reports' | 'users' | 'awards' | 'statistics' | '';

const HeaderLayout = () => {
  const pathName = usePathname();
  const { push, back } = useRouter();
  const { windowSize } = useWindowSize();

  const [alignment, setAlignment] = useState<Alignment>(
    convertPathName(pathName)
  );

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newAlignment: Alignment) => {
      if (convertPathName(pathName) !== '' && newAlignment != null) {
        push(`${pathName.replace(alignment, newAlignment)}`);
      } else {
        if (newAlignment === null) {
          push(pathName);
        } else {
          push(`${pathName}/${newAlignment}`);
        }
      }
      setAlignment(newAlignment);
    },
    [alignment, pathName, push]
  );

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
          orientation={windowSize.winWidth < 420 ? 'vertical' : 'horizontal'}
        >
          <ToggleButton value='reports'>Сводка</ToggleButton>
          <ToggleButton value=''>Информация</ToggleButton>
          <ToggleButton value='users'>Сотрудники</ToggleButton>
          <ToggleButton value='awards'>Медали</ToggleButton>
          <ToggleButton value='statistics'>Статистика</ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default memo(HeaderLayout);
