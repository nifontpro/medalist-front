import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TreeIdsState {
  expandedIds: string[];
  selectedIds: string;
}

const initialState: TreeIdsState = {
  expandedIds: ['0'],
  selectedIds: '0',
};

export const sidebarTreeSlice = createSlice({
  name: 'sidebarTree',
  initialState,
  reducers: {
    setArrayIds: (state, action: PayloadAction<string[]>) => {
      state.expandedIds = action.payload;
    },
    setSelectedTreeId: (state, action: PayloadAction<string>) => {
      state.selectedIds = action.payload;
    },
  },
});

export const { setArrayIds, setSelectedTreeId } = sidebarTreeSlice.actions;

export default sidebarTreeSlice.reducer;
