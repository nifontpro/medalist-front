import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '@/app/_auth/data/auth.api';

interface IAuthState {
  isAuth: boolean;
  accessToken: string | undefined;
  idToken: string | undefined;
  loading: boolean
}

const initialState: IAuthState = {
  isAuth: false,
  accessToken: undefined,
  idToken: undefined,
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthResponse>) => {
      state.isAuth = true;
      state.accessToken = action.payload.access_token;
      state.idToken = action.payload.id_token;
      localStorage.setItem('refresh', action.payload.refresh_token);
      localStorage.setItem('it', action.payload.id_token);
      // console.log('AuthSlice')
    },
    setNoAuth: (state) => {
      state.accessToken = undefined;
      state.idToken = undefined;
      localStorage.removeItem('refresh');
      localStorage.removeItem('it');
      state.isAuth = false;
    },
    setNoAccess: (state) => {
      state.accessToken = undefined;
      state.idToken = undefined;
      localStorage.removeItem('refresh');
      localStorage.removeItem('it');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
});

export const authActions = authSlice.actions;