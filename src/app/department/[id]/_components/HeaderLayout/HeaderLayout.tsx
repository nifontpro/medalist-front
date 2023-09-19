'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { memo, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useWindowSize } from '@/hooks/useWindowSize';
import { convertPathName } from './convertPathName';
import { getLastUrl } from './getLastUrl';
import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
import styles from './HeaderLayout.module.scss';

type Alignment = 'information' | 'users' | 'awards' | 'statistics' | '';

const HeaderLayout = () => {
  const pathName = usePathname();
  const { push, back } = useRouter();
  const { windowSize } = useWindowSize();

  const [alignment, setAlignment] = useState<Alignment>(
    convertPathName(pathName)
  );
  useEffect(() => {
    setAlignment(convertPathName(pathName));
  }, [pathName]);

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
      <Breadcrumbs />
      {getLastUrl(pathName) === 'edit' ? null : (
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
          className={styles.wrapper}
          // className='my-5 w-full justify-center'
          orientation={windowSize.winWidth < 580 ? 'vertical' : 'horizontal'}
        >
          <ToggleButton value=''>Дашборд</ToggleButton>
          <ToggleButton value='information'>Инофрмация</ToggleButton>
          <ToggleButton value='users'>Сотрудники</ToggleButton>
          <ToggleButton value='awards'>Награды</ToggleButton>
          <ToggleButton value='statistics'>Статистика</ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
};

export default memo(HeaderLayout);
