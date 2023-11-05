import { Dept } from '@/types/dept/dept';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const treeDeptsSlice = createSlice({
  name: 'treeDepts',
  initialState: [] as Dept[] | null,
  reducers: {
    setTreeDepts: (state, action: PayloadAction<Dept[]>) =>
      (state = action.payload),
    resetTreeDepts: (state) => (state = null),
  },
});

export const { setTreeDepts, resetTreeDepts } = treeDeptsSlice.actions;
export default treeDeptsSlice.reducer;
