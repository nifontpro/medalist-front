import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const visibleModalWindowGalleryAwardsSlice = createSlice({
  name: 'visibleModalWindowGalleryAwards',
  initialState: false,
  reducers: {
    setVisible: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setVisible } = visibleModalWindowGalleryAwardsSlice.actions;
export default visibleModalWindowGalleryAwardsSlice.reducer;
