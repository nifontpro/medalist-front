import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {CLIENT_ID, IAuthResponse, KEYCLOAK_URI} from "@/app/api/auth/auth.api";
import {TypeRootState} from "@/app/store/storage/store";
import {authActions} from "@/app/store/storage/auth/auth.slice";
import process from "process";

const API_SERVER_URL = process.env.API_SERVER_URL

export const baseQuery = fetchBaseQuery({
    baseUrl: API_SERVER_URL,
})

const accessQuery = fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as TypeRootState).auth.accessToken
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
})

export const refreshQuery = fetchBaseQuery({
    baseUrl: KEYCLOAK_URI,
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions,) => {
        let result = await accessQuery(args, api, extraOptions)

        if (result.error && result.error.status === 401) {

            const refreshToken = localStorage.getItem("refresh")
            // const refreshTokenSlice = (api.getState() as TypeRootState).auth.refreshToken

            if (refreshToken == null) {
                api.dispatch(authActions.setNoAuth())
                return result
            }

            const formData = new URLSearchParams()
            formData.append('grant_type', 'refresh_token')
            formData.append('client_id', CLIENT_ID)
            formData.append('refresh_token', refreshToken)

            const refreshResult = await refreshQuery(
                {method: 'POST', url: '/token', body: formData}, api, extraOptions
            )

            if (refreshResult?.error != undefined) {
                api.dispatch(authActions.setNoAuth())
            } else {
                if (refreshResult?.data) {
                    const refreshResponse = refreshResult.data as IAuthResponse
                    api.dispatch(authActions.setAuthData(refreshResponse))
                    // retry the original query with new access token
                    result = await accessQuery(args, api, extraOptions)
                } else {
                    api.dispatch(authActions.setNoAuth())
                }
            }
        }

        return result
    }