import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  startDate: string;
  endDate: string;
}

const initialState: IModalState = {
  startDate: '',
  endDate: '',
};

export const dataCreateAwardSlice = createSlice({
  name: 'dataCreateAward',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetDate: (state) => {
      state.endDate = '';
      state.startDate = '';
    },
  },
});

export const {setStartDate, setEndDate, resetDate} = dataCreateAwardSlice.actions;
export default dataCreateAwardSlice.reducer;
