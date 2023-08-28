import { setSwitcher } from '@/store/features/switchDepartmentOnCompany/switchDepartmentOnCompany.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const SwitchDepartOnCompany = () => {
  const switcher = useAppSelector((state) => state.switcher);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSwitcher(event.target.checked));
  };

  return (
    <FormControlLabel
      label='Включить подотделы'
      control={<Checkbox checked={switcher} onChange={handleChange} />}
    />
  );
};

export default SwitchDepartOnCompany;
