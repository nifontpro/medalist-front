import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface IModalState {
  startDate: string;
  startValue: string | null;
  endDate: string;
  endValue: string | null;
}

const initialState: IModalState = {
  startDate: '',
  startValue: null,
  endDate: '',
  endValue: null,
};

export const dataCreateAwardSlice = createSlice({
  name: 'dataCreateAward',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = dayjs(action.payload).format('DD.MM.YYYY');
      state.startValue = dayjs(action.payload).toString();
    },
    clearStartDate: (state) => {
      state.startDate = '';
      state.startValue = null;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = dayjs(action.payload).format('DD.MM.YYYY');
      state.endValue = dayjs(action.payload).toString();
    },
    clearEndDate: (state) => {
      state.endDate = '';
      state.endValue = null;
    },
    resetDate: (state) => {
      state.endDate = '';
      state.startDate = '';
      state.startValue = null;
      state.endValue = null;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  resetDate,
  clearStartDate,
  clearEndDate,
} = dataCreateAwardSlice.actions;
export default dataCreateAwardSlice.reducer;
