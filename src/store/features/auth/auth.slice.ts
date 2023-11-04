import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  isAuth: boolean;
  accessToken: string | undefined;
  idToken: string | undefined;
  loading: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
  accessToken: undefined,
  idToken: undefined,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      console.log('payload', action.payload);
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
