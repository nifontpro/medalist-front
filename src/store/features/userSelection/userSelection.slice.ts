import { User } from '@/types/user/user';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TypeOfUser {
  typeOfUser: User | undefined;
  isOpen: boolean;
}

const initialState: TypeOfUser = {
  typeOfUser: undefined,
  isOpen: false,
};

export const userSelectionSlice = createSlice({
  name: 'userSelection',
  initialState,
  reducers: {
    setTypeOfUser: (state, action: PayloadAction<User>) => {
      state.typeOfUser = action.payload;
    },
    setTypeOfUser_IsOpen: (state, action: PayloadAction<User>) => {
      state.typeOfUser = action.payload;
      state.isOpen = false;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setTypeOfUserUndefined: (state) => {
      state.typeOfUser = undefined
    },
  },
});

export const { setTypeOfUser, setTypeOfUser_IsOpen, setIsOpen, setTypeOfUserUndefined } =
  userSelectionSlice.actions;

export default userSelectionSlice.reducer;
