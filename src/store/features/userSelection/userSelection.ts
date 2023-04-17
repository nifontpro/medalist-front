import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TypeOfUser {
  typeOfUser: string[];
}

const initialState: TypeOfUser = {
  typeOfUser: [],
};

export const userSelectionSlice = createSlice({
  name: 'userSelection',
  initialState,
  reducers: {
    setTypeOfUser: (state, action: PayloadAction<string[]>) => {
      //   state.expandedIds = action.payload;
    },
  },
});

export const { setTypeOfUser } = userSelectionSlice.actions;

export default userSelectionSlice.reducer;
