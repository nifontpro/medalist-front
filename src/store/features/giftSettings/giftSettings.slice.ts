import { DeptSettings } from '@/types/dept/DeptSettings';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const giftSettings = createSlice({
  name: 'theme',
  initialState: null as DeptSettings | null,
  reducers: {
    setGiftsSettings: (_, action: PayloadAction<DeptSettings>) =>
      action.payload,
  },
});

export const { setGiftsSettings } = giftSettings.actions;
export default giftSettings.reducer;
