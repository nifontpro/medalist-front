import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  navigationVisible: boolean
}

const initialState: HeaderState = {
  navigationVisible: false
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setNavigationVisible: (state, action: PayloadAction<boolean>) => {
      state.navigationVisible = action.payload;
    },
  },
});

export const { setNavigationVisible } = headerSlice.actions;

export default headerSlice.reducer;

// // Использование в компоненте пример
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import { setArrayIds } from '@/redux/features/treeIdsArray/treeIdsArray.slice';

// const treeIds = useAppSelector((state) => state.treeIds.value);
// const dispatch = useAppDispatch();
