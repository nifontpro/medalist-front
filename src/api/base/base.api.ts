// import { authActions } from '@/store/features/auth/auth.slice';
// import { KEYCLOAK_URI } from '@/app/_components/MainLayout/MainLayout';
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
// import { CLIENT_ID, IAuthResponse, KEYCLOAK_URI } from '../auth/auth.api';

// const API_SERVER_URL = process.env.API_SERVER_URL;

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
    // const refreshToken = localStorage.getItem('refresh');
    // const refreshTokenSlice = (api.getState() as TypeRootState).auth.refreshToken

    if (refreshToken == null) {
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

    if (refreshResult?.error != undefined) {
      console.log(refreshResult?.error);
    } else {
      if (refreshResult?.data) {
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
        // api.dispatch(authSlice.setToken(refreshResponse));
        // retry the original query with new access token
        result = await accessQuery(args, api, extraOptions);
      } else {
        console.log('no data');
      }
    }
  }

  // if (result.error && result.error.status === 401) {
  //   const refreshToken = localStorage.getItem('refresh');
  //   // const refreshTokenSlice = (api.getState() as TypeRootState).auth.refreshToken

  //   if (refreshToken == null) {
  //     api.dispatch(authActions.setNoAuth());
  //     return result;
  //   }

  //   const formData = new URLSearchParams();
  //   formData.append('grant_type', 'refresh_token');
  //   formData.append('client_id', CLIENT_ID);
  //   formData.append('refresh_token', refreshToken);

  //   const refreshResult = await refreshQuery(
  //     { method: 'POST', url: '/token', body: formData },
  //     api,
  //     extraOptions
  //   );

  //   if (refreshResult?.error != undefined) {
  //     api.dispatch(authActions.setNoAuth());
  //   } else {
  //     if (refreshResult?.data) {
  //       const refreshResponse = refreshResult.data as IAuthResponse;
  //       api.dispatch(authActions.setAuthData(refreshResponse));
  //       // retry the original query with new access token
  //       result = await accessQuery(args, api, extraOptions);
  //     } else {
  //       api.dispatch(authActions.setNoAuth());
  //     }
  //   }
  // }

  return result;
};
