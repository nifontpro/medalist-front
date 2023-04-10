import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '@/app/_auth/data/auth.api';
import { TypeRootState, useTypedSelector } from '@/redux/store';

interface IAuthState {
  isAuth: boolean;
  accessToken: string | undefined;
  idToken: string | undefined;
}

const initialState: IAuthState = {
  isAuth: false,
  accessToken: undefined,
  idToken: undefined,
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
  },
});

export const authActions = authSlice.actions;

export const useAuthState = () =>
  useTypedSelector((state: TypeRootState) => state.auth);
