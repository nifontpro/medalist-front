import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SingleData = {
  isLoading: boolean;
  isSuccess: boolean;
};

type DashBoardLoading = {
  mainAwards: SingleData;
  mainUsers: SingleData;
  mainNominees: SingleData;
  mainActivitys: SingleData;
  events: SingleData;
};

const initialState: DashBoardLoading = {
  mainAwards: {
    isLoading: false,
    isSuccess: false,
  },
  mainUsers: {
    isLoading: false,
    isSuccess: false,
  },
  mainNominees: {
    isLoading: false,
    isSuccess: false,
  },
  mainActivitys: {
    isLoading: false,
    isSuccess: false,
  },
  events: {
    isLoading: false,
    isSuccess: false,
  },
};

export const dashboardLoadingSlice = createSlice({
  name: 'dashboardLoading',
  initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{ type: string; value: boolean }>
    ) => {
      const { type, value } = action.payload;
      if (state[type as keyof DashBoardLoading]) {
        state[type as keyof DashBoardLoading].isLoading = value;
      }
    },
    setSuccess: (
      state,
      action: PayloadAction<{ type: string; value: boolean }>
    ) => {
      const { type, value } = action.payload;
      if (state[type as keyof DashBoardLoading]) {
        state[type as keyof DashBoardLoading].isSuccess = value;
      }
    },
  },
});

export const { setLoading, setSuccess } = dashboardLoadingSlice.actions;
export default dashboardLoadingSlice.reducer;
