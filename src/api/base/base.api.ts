import { authSlice } from '@/store/features/auth/auth.slice';
import { TypeRootState } from '@/store/storage/store';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { getCookie, setCookie } from 'cookies-next';
import process from 'process';

export const KEYCLOAK_URI = `${process.env.KEYCLOAK_URL}/realms/medalist-realm/protocol/openid-connect`;
export const CLIENT_ID = 'medalist-client';
export const APP_URI = process.env.APP_URL;
export const AUTH_CODE_REDIRECT_URI = APP_URI + '/login/redirect';

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  session_state: string;
  scope: string;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as TypeRootState).auth.access_token;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const accessQuery = fetchBaseQuery({
  baseUrl: process.env.API_SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as TypeRootState).auth.access_token;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const refreshQuery = fetchBaseQuery({
  baseUrl: KEYCLOAK_URI,
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await accessQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getCookie('refresh_token');

    // Если refresh токен отсутствует, перенаправляем пользователя на страницу входа
    if (!refreshToken) {
      // Здесь должен быть ваш код для перенаправления на страницу входа
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      return result;
    }

    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('client_id', CLIENT_ID);
    formData.append('refresh_token', refreshToken as string);

    const refreshResult = await refreshQuery(
      { method: 'POST', url: '/token', body: formData },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const refreshResponse = refreshResult.data as IAuthResponse;
      api.dispatch(
        authSlice.actions.setTokenAndIdToken({
          token: refreshResponse.access_token,
          idToken: refreshResponse.id_token,
        })
      );
      setCookie('refresh_token', refreshResponse.refresh_token);
      setCookie('id_token', refreshResponse.id_token);
      setCookie('access_token', refreshResponse.access_token);

      // После обновления токена делаем повторный запрос
      result = await accessQuery(args, api, extraOptions);
    } else {
      console.log('no data');
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      // Здесь тоже может быть перенаправление на страницу входа
    }
  }

  return result;
};
