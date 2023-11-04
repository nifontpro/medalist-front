import { decodeToken } from '@/fetch-token';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  access_token: string | undefined;
  idToken: string | undefined;
  loading: boolean;
}

const initialState: IAuthState = {
  access_token: undefined,
  idToken: undefined,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // console.log('action.payload', action.payload);
      state.access_token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
