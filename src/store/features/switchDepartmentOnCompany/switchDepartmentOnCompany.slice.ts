import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const switchDepartmentOnCompanySlice = createSlice({
  name: 'switcher',
  initialState: false,
  reducers: {
    setSwitcher: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setSwitcher } = switchDepartmentOnCompanySlice.actions;
export default switchDepartmentOnCompanySlice.reducer;
