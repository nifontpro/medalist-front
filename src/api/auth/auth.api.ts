import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { authActions } from '@/store/features/auth/auth.slice';
import * as process from 'process';

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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: KEYCLOAK_URI,
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    getLoginData: build.mutation<
      IAuthResponse,
      { code: string; codeVerifier: string }
    >({
      query: (params) => {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('client_id', CLIENT_ID);
        formData.append('code', params.code);
        formData.append('redirect_uri', AUTH_CODE_REDIRECT_URI);
        formData.append('code_verifier', params.codeVerifier);
        return {
          method: 'POST',
          url: '/token',
          body: formData,
        };
      },
      invalidatesTags: ['Auth'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          console.log('Auth Api LogData');
          dispatch(authActions.setIsAuth(true));
          const { data } = await queryFulfilled;
          await dispatch(authActions.setAuthData(data));
        } catch (error) {
          console.error(`ERROR LOGIN!`, error);
        }
      },
    }),

    logout: build.mutation<void, string>({
      query: (id_token) => ({
        method: 'GET',
        url: 'logout',
        params: {
          id_token,
          // post_logout_redirect_uri: APP_URI,
          client_id: CLIENT_ID,
        },
      }),
      invalidatesTags: ['Auth'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          console.log('Auth Api LogoutData');
          await queryFulfilled;
          await dispatch(authActions.setNoAuth());
        } catch (error) {
          console.error(`Error LOGOUT!`, error);
        }
      },
    }),
  }),
});
