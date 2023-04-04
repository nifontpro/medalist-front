

import { userData } from '@/app/user/_api/user.data';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { useState } from 'react';
import Users from './users/_components/Users/Users';
import Medals from './_components/Medals/Medals';
import Statistic from './_components/Statistic/Statistic';

export const SingleDepartment = ({ params }: { params: { id: string } }) => {
  const users = userData.filter((user) => user.deptId === Number(params.id));
  // const [alignment, setAlignment] = useState<'Users' | 'Medals' | 'Statistic'>(
  //   'Users'
  // );

  // const handleChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: 'Users' | 'Medals' | 'Statistic'
  // ) => {
  //   ``;
  //   setAlignment(newAlignment);
  // };

  return (
    <div>
      Department {params.id}
      {/* <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label='Platform'
      >
        <ToggleButton value='Users'>Сотрудники</ToggleButton>
        <ToggleButton value='Medals'>Медали</ToggleButton>
        <ToggleButton value='Statistic'>Статистика</ToggleButton>
      </ToggleButtonGroup> */}

      {/* {alignment === 'Users' ? (
        <Users users={users} id={params.id} />
      ) : alignment === 'Medals' ? (
        <Medals id={params.id} />
      ) : alignment === 'Statistic' ? (
        <Statistic id={params.id} />
      ) : null} */}
    </div>
  );
};

export default SingleDepartment;
