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
    setTokenAndIdToken: (
      state,
      action: PayloadAction<{ token: string; idToken: string }>
    ) => {
      state.access_token = action.payload.token;
      state.idToken = action.payload.idToken;
    },
    removeToken: (state) => {
      state.access_token = undefined;
    },
  },
});

export const { setToken, removeToken, setTokenAndIdToken } = authSlice.actions;

export default authSlice.reducer;
